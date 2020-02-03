const app = require('../app');
const request = require('supertest')(app);
const expect = require('chai').expect;
let loggedUserId;
let loggedUserToken;
let holidaysId;

describe('userHolidays', () => {
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

    describe('GET /userHolidays', () => {
        it('getting data of this user', async () => {
            let response = await request
                .get(`/employees/${loggedUserId}/holidays`)
                .set('Authorization', 'Bearer ' + loggedUserToken);

            expect(response.body);
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

            holidaysId = response.body.id;

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

        it('returns an error if finish_date is blank', async () => {
            let userHolidays = {
                finish_date: null
            };

            let response = await request
                .post(`/employees/${loggedUserId}/holidays`)
                .set('Authorization', 'Bearer ' + loggedUserToken)
                .send(userHolidays);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'finish_date',
                message: 'Invalid date format'
            });
        });

        it('returns an error if user_id is undefined', async () => {
            let userHolidays = {
                user_id: undefined
            };

            let response = await request
                .post(`/employees/${loggedUserId}/holidays`)
                .set('Authorization', 'Bearer ' + loggedUserToken)
                .send(userHolidays);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'user_id',
                message: 'Id required'
            });
        });
    });

    describe('PUT /employeeHolidays', async () => {
        it('sending request for holidays to admin', async () => {
            let userHolidays = {
                start_date: '2019-01-12',
                finish_date: '2019-01-13',
                user_id: loggedUserId
            };

            let response = await request
                .put(`/employees/${loggedUserId}/holidays/${holidaysId}`)
                .set('Authorization', 'Bearer ' + loggedUserToken)
                .send(userHolidays);

            expect(response.body).to.have.property('days_taken');
        });

        it('returns an error if start_date is blank', async () => {
            let userHolidays = {
                start_date: null
            };

            let response = await request
                .put(`/employees/${loggedUserId}/holidays/${holidaysId}`)
                .set('Authorization', 'Bearer ' + loggedUserToken)
                .send(userHolidays);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'start_date',
                message: 'Invalid date format'
            });
        });

        it('returns an error if finish_date is blank', async () => {
            let userHolidays = {
                finish_date: null
            };

            let response = await request
                .put(`/employees/${loggedUserId}/holidays/${holidaysId}`)
                .set('Authorization', 'Bearer ' + loggedUserToken)
                .send(userHolidays);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'finish_date',
                message: 'Invalid date format'
            });
        });

        it('returns an error if user_id is undefined', async () => {
            let userHolidays = {
                user_id: undefined
            };

            let response = await request
                .put(`/employees/${loggedUserId}/holidays/${holidaysId}`)
                .set('Authorization', 'Bearer ' + loggedUserToken)
                .send(userHolidays);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'user_id',
                message: 'Id required'
            });
        });

        it("returns 404 if holiday hasn't been found", async () => {
            let userHolidays = {
                start_date: '2019-01-12',
                finish_date: '2019-01-13',
                user_id: loggedUserId
            };

            let response = await request
                .patch(`/employees/${loggedUserId}/holidays/99999999`)
                .set('Authorization', 'Bearer ' + loggedUserToken)
                .send(userHolidays);

            expect(response.statusCode).to.equal(404);
        });
    });

    describe('DELETE /employeeHolidays', async () => {
        it('deletes a holidays request', async () => {
            let response = await request
                .delete(`/employees/${loggedUserId}/holidays/${holidaysId}`)
                .set('Authorization', 'Bearer ' + loggedUserToken);

            expect(response.statusCode).to.equal(204);
        });

        it('returns 403 when trying to delete somone else', async () => {
            loggedUserBadToken =
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImVtYWlsIjoiS2VuZGFsbC5TdHJvc2luQGhvdG1haWwuY29tIiwibmFtZSI6IklkZWxsYSIsInN1cm5hbWUiOiJDYXJ0ZXIiLCJiaXJ0aGRhdGUiOiIyMDE5LTA4LTAzIiwiZGF5c19sZWZ0IjoyNiwiY3JlYXRlZEF0IjoiMjAyMC0wMS0zMVQxNjowNDo1Ny4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMC0wMS0zMVQxNjowNDo1Ny4wMDBaIiwiUm9sZSI6eyJpZCI6MTcsIm5hbWUiOiJ1c2VyIiwiY3JlYXRlZEF0IjoiMjAyMC0wMS0zMVQxNjowNDo1OC4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMC0wMS0zMVQxNjowNDo1OC4wMDBaIiwidXNlcl9pZCI6MTcsIlVzZXJJZCI6MTd9LCJpYXQiOjE1ODA3Mjc1NDYsImV4cCI6MTU4MDgxMzk0Nn0.2Xmsj3nGaIuAfzw6Q1tAvEj2ZAGGWWtDzJGnnlpKtwo';

            let response = await request
                .delete(`/employees/${loggedUserId}/holidays/${holidaysId}`)
                .set('Authorization', 'Bearer ' + loggedUserBadToken);

            expect(response.statusCode).to.equal(403);
        });

        it("returns 404 if holiday hasn't been found", async () => {
            let response = await request
                .delete(`/employees/${loggedUserId}/holidays/99999999`)
                .set('Authorization', 'Bearer ' + loggedUserToken);

            expect(response.statusCode).to.equal(404);
        });
    });
});
