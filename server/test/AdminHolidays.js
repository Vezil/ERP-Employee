const app = require('../app');
const request = require('supertest')(app);
const expect = require('chai').expect;
let loggedAdminToken;
let badToken;
let holidaysId;
let userId = 1;

async function loginOtherPerson() {
    const personData = {
        email: 'user@erp.test',
        password: 'password'
    };

    const response = await request.post(`/login`).send(personData);

    badToken = response.body.token;
}

loginOtherPerson();

describe('adminHolidays', () => {
    describe('POST /login', () => {
        it('login when passing valid data', async () => {
            const adminData = {
                email: 'admin@erp.test',
                password: 'password'
            };

            const response = await request.post(`/login`).send(adminData);

            expect(response.body).to.have.property('token');

            loggedAdminToken = response.body.token;
            loggedAdminId = response.body.user.id;
        });

        it('returns an error if email is blank', async () => {
            const adminData = {
                email: null
            };

            const response = await request.post(`/login`).send(adminData);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'email',
                message: 'Email is required and min length is 5 chars'
            });
        });

        it('returns an error if password is blank', async () => {
            const adminData = {
                password: null
            };

            const response = await request.post(`/login`).send(adminData);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'password',
                message: 'Password is required and min length is 8 chars'
            });
        });

        it('returns an error if password contains less than 8 character', async () => {
            const adminData = {
                password: 12345
            };
            const response = await request.post(`/login`).send(adminData);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'password',
                message: 'Password is required and min length is 8 chars'
            });
        });
    });

    describe('GET /holidays', () => {
        it('getting all holidays data', async () => {
            const response = await request
                .get(`/holidays`)
                .set('Authorization', 'Bearer ' + loggedAdminToken);

            expect(response.body);
        });
        it('returns 403 when trying to get holidays somone else', async () => {
            const response = await request
                .get(`/holidays`)
                .set('Authorization', 'Bearer ' + badToken);

            expect(response.statusCode).to.equal(403);
        });
    });

    describe('POST /holidays', async () => {
        it('adding new holidays for user', async () => {
            const newHolidays = {
                start_date: '2019-01-12',
                finish_date: '2019-01-13',
                user_id: userId
            };

            const response = await request
                .post(`/holidays`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(newHolidays);

            holidaysId = response.body.id;

            expect(response.body).to.have.property('days_taken');
        });

        it('returns an error if start_date is blank', async () => {
            const userHolidays = {
                start_date: null
            };

            const response = await request
                .post(`/holidays`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(userHolidays);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'start_date',
                message: 'Invalid date format'
            });
        });

        it('returns an error if finish_date is blank', async () => {
            const userHolidays = {
                finish_date: null
            };

            const response = await request
                .post(`/holidays`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(userHolidays);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'finish_date',
                message: 'Invalid date format'
            });
        });

        it('returns an error if user_id is undefined', async () => {
            const userHolidays = {
                user_id: undefined
            };

            const response = await request
                .post(`/holidays`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(userHolidays);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'user_id',
                message: 'Id required'
            });
        });

        it('returns 403 when trying to add holidays somone else', async () => {
            const newHolidays = {
                start_date: '2019-01-12',
                finish_date: '2019-01-13',
                user_id: userId
            };

            const response = await request
                .put(`/holidays/${holidaysId}`)
                .set('Authorization', 'Bearer ' + badToken)
                .send(newHolidays);

            expect(response.statusCode).to.equal(403);
        });
    });

    describe('PUT /holidays', async () => {
        it('editing holiday of user', async () => {
            const userHolidays = {
                start_date: '2019-01-12',
                finish_date: '2019-01-13',
                user_id: userId
            };

            const response = await request
                .put(`/holidays/${holidaysId}`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(userHolidays);

            expect(response.body).to.have.property('days_taken');
        });

        it('returns an error if start_date is blank', async () => {
            const userHolidays = {
                start_date: null
            };

            const response = await request
                .put(`/holidays/${holidaysId}`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(userHolidays);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'start_date',
                message: 'Invalid date format'
            });
        });

        it('returns an error if finish_date is blank', async () => {
            const userHolidays = {
                finish_date: null
            };

            const response = await request
                .put(`/holidays/${holidaysId}`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(userHolidays);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'finish_date',
                message: 'Invalid date format'
            });
        });

        it('returns an error if user_id is undefined', async () => {
            const userHolidays = {
                user_id: undefined
            };

            const response = await request
                .put(`/holidays/${holidaysId}`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(userHolidays);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'user_id',
                message: 'Id required'
            });
        });

        it('returns 403 when trying to change holidays somone else', async () => {
            const userHolidays = {
                start_date: '2019-01-12',
                finish_date: '2019-01-13',
                user_id: userId
            };

            const response = await request
                .put(`/holidays/${holidaysId}`)
                .set('Authorization', 'Bearer ' + badToken)
                .send(userHolidays);

            expect(response.statusCode).to.equal(403);
        });

        it("returns 404 if holiday hasn't been found", async () => {
            const userHolidays = {
                start_date: '2019-01-12',
                finish_date: '2019-01-13',
                user_id: userId
            };

            const response = await request
                .put(`/holidays/99999999`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(userHolidays);

            expect(response.statusCode).to.equal(404);
        });
    });

    describe('PUT /holidays/:id/confirm', async () => {
        it('returns confirmed of holiday', async () => {
            const dataConfirmed = {
                confirmed: true
            };

            const response = await request
                .put(`/holidays/${holidaysId}/confirm`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(dataConfirmed);

            expect(response.body).to.have.property('confirmed');
        });

        it('returns an error if confirmed is blank', async () => {
            const dataConfirmed = {
                confirmed: null
            };

            const response = await request
                .put(`/holidays/${holidaysId}/confirm`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(dataConfirmed);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'confirmed',
                message: 'Something wrong with confirm'
            });
        });

        it('returns 403 when trying to confirm somone else', async () => {
            const dataConfirmed = {
                confirmed: true
            };

            const response = await request
                .put(`/holidays/${holidaysId}/confirm`)
                .set('Authorization', 'Bearer ' + badToken)
                .send(dataConfirmed);

            expect(response.statusCode).to.equal(403);
        });

        it("returns 404 if holiday hasn't been found", async () => {
            const response = await request
                .delete(`/holidays/99999999`)
                .set('Authorization', 'Bearer ' + loggedAdminToken);

            expect(response.statusCode).to.equal(404);
        });
    });

    describe('DELETE /holidays', async () => {
        it('deletes a holiday', async () => {
            const response = await request
                .delete(`/holidays/${holidaysId}`)
                .set('Authorization', 'Bearer ' + loggedAdminToken);

            expect(response.statusCode).to.equal(204);
        });

        it('returns 403 when trying to delete somone else', async () => {
            const response = await request
                .delete(`/holidays/${holidaysId}`)
                .set('Authorization', 'Bearer ' + badToken);

            expect(response.statusCode).to.equal(403);
        });

        it("returns 404 if holiday hasn't been found", async () => {
            const response = await request
                .delete(`/holidays/99999999`)
                .set('Authorization', 'Bearer ' + loggedAdminToken);

            expect(response.statusCode).to.equal(404);
        });
    });
});
