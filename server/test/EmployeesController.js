const app = require('../app');
const request = require('supertest')(app);
const expect = require('chai').expect;
let loggedUserId;
let loggedUserToken;

describe('employee', () => {
    describe('POST /login', () => {
        it('login when passing valid data', async () => {
            let userData = {
                email: 'user@erp.test',
                password: 'password'
            };

            let response = await request.post(`/login`).send(userData);

            expect(response.body).to.have.property('token');

            loggedUserToken = response.body.token;
            loggedUserId = response.body.user.id;

            describe('GET /userHolidays', () => {
                it('getting data of this user', async () => {
                    await request
                        .get(`/employees/${response.body.id}/holidays`)
                        .set('Authorization', 'Bearer ' + response.body.token);

                    expect(response.body);
                });
            });
        });

        it('returns an error if email is blank', async () => {
            let userData = {
                email: null
            };

            let response = await request.post(`/login`).send(userData);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'email',
                message: 'Email is required and min length is 5 chars'
            });
        });

        it('returns an error if password is blank', async () => {
            let userData = {
                password: null
            };

            let response = await request.post(`/login`).send(userData);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'password',
                message: 'Password is required and min length is 8 chars'
            });
        });

        it('returns an error if password contains less than 8 character', async () => {
            const userData = {
                password: 12345
            };
            let response = await request.post(`/login`).send(userData);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'password',
                message: 'Password is required and min length is 8 chars'
            });
        });
    });

    describe('POST /employeeHolidays', async () => {
        it('sending request for holidays to admin', async () => {
            let userHolidays = {
                start_date: '2019-01-12',
                finish_date: '2019-01-13',
                user_id: loggedUserId
            };

            let response = await request
                .post(`/employees/${loggedUserId}/holidays`)
                .set('Authorization', 'Bearer ' + loggedUserToken)
                .send(userHolidays);

            expect(response.body).to.have.property('days_taken');
        });

        it('returns an error if start_date is blank', async () => {
            let userHolidays = {
                start_date: null
            };

            let response = await request
                .post(`/employees/${loggedUserId}/holidays`)
                .set('Authorization', 'Bearer ' + loggedUserToken)
                .send(userHolidays);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'start_date',
                message: 'Invalid date format'
            });
        });
    });
});
