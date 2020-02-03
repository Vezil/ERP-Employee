const app = require('../app');
const request = require('supertest')(app);
const expect = require('chai').expect;

let loggedAdminToken;
let contractId;
let contractIdBad;
let userId = 1;

const loggedUserBadToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImVtYWlsIjoiS2VuZGFsbC5TdHJvc2luQGhvdG1haWwuY29tIiwibmFtZSI6IklkZWxsYSIsInN1cm5hbWUiOiJDYXJ0ZXIiLCJiaXJ0aGRhdGUiOiIyMDE5LTA4LTAzIiwiZGF5c19sZWZ0IjoyNiwiY3JlYXRlZEF0IjoiMjAyMC0wMS0zMVQxNjowNDo1Ny4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMC0wMS0zMVQxNjowNDo1Ny4wMDBaIiwiUm9sZSI6eyJpZCI6MTcsIm5hbWUiOiJ1c2VyIiwiY3JlYXRlZEF0IjoiMjAyMC0wMS0zMVQxNjowNDo1OC4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMC0wMS0zMVQxNjowNDo1OC4wMDBaIiwidXNlcl9pZCI6MTcsIlVzZXJJZCI6MTd9LCJpYXQiOjE1ODA3Mjc1NDYsImV4cCI6MTU4MDgxMzk0Nn0.2Xmsj3nGaIuAfzw6Q1tAvEj2ZAGGWWtDzJGnnlpKtwo';

describe('contracts', async () => {
    it('login when passing valid data', async () => {
        let adminData = {
            email: 'admin@erp.test',
            password: 'password'
        };

        let response = await request.post(`/login`).send(adminData);

        expect(response.body).to.have.property('token');

        loggedAdminToken = response.body.token;
        loggedAdminId = response.body.user.id;
    });

    it('returns an error if email is blank', async () => {
        let adminData = {
            email: null
        };

        let response = await request.post(`/login`).send(adminData);

        expect(response.body).to.have.property('errors');
        expect(response.body.errors).to.deep.include({
            param: 'email',
            message: 'Email is required and min length is 5 chars'
        });
    });

    it('returns an error if password is blank', async () => {
        let adminData = {
            password: null
        };

        let response = await request.post(`/login`).send(adminData);

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
        let response = await request.post(`/login`).send(adminData);

        expect(response.body).to.have.property('errors');
        expect(response.body.errors).to.deep.include({
            param: 'password',
            message: 'Password is required and min length is 8 chars'
        });
    });

    describe('GET /contracts', () => {
        it('getting all contracts', async () => {
            let response = await request
                .get(`/contracts`)
                .set('Authorization', 'Bearer ' + loggedAdminToken);

            expect(response.body);
        });

        it('returns 403 when trying to get somone else', async () => {
            let response = await request
                .get(`/contracts`)
                .set('Authorization', 'Bearer ' + loggedUserBadToken);

            expect(response.statusCode).to.equal(403);
        });
    });

    describe('POST /contracts', async () => {
        it('adding a new contract', async () => {
            let newContract = {
                contract_length: 12,
                start_date: '2019-12-12',
                finish_date: '2020-12-12',
                user_id: userId,
                holidays_per_year: 20
            };

            let response = await request
                .post(`/contracts`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(newContract);

            contractId = response.body.id;

            expect(response.body).to.have.property('contract_length');
        });

        it('returns an error if contract_length is blank', async () => {
            let newContract = {
                contract_length: null
            };

            let response = await request
                .post(`/contracts`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(newContract);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'contract_length',
                message:
                    'Invalid type of contract. It must be number (1/3/6/12)'
            });
        });
        it('returns an error if start_date is blank', async () => {
            let newContract = {
                start_date: null
            };

            let response = await request
                .post(`/contracts`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(newContract);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'start_date',
                message: 'Invalid date format'
            });
        });

        it('returns an error if finish_date is blank', async () => {
            let newContract = {
                finish_date: null
            };

            let response = await request
                .post(`/contracts`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(newContract);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'finish_date',
                message: 'Invalid date format'
            });
        });

        it('returns an error if user_id is blank', async () => {
            let newContract = {
                user_id: null
            };

            let response = await request
                .post(`/contracts`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(newContract);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'user_id',
                message: 'Id required'
            });
        });

        it('returns an error if holidays_per_year is blank', async () => {
            let newContract = {
                holidays_per_year: null
            };

            let response = await request
                .post(`/contracts`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(newContract);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'holidays_per_year',
                message: 'Invalid type of holidays. It must be number (20/26)'
            });
        });

        it('returns 403 when trying to edit somone else', async () => {
            let newContract = {
                contract_length: 12,
                start_date: '2019-12-12',
                finish_date: '2020-12-12',
                user_id: userId,
                holidays_per_year: 20
            };

            let response = await request
                .post(`/contracts/`)
                .set('Authorization', 'Bearer ' + loggedUserBadToken)
                .send(newContract);

            contractIdBad = response.body.id;

            expect(response.statusCode).to.equal(403);
        });
    });
    describe('PUT /contracts', async () => {
        it('editing contract', async () => {
            let updateContract = {
                contract_length: 12,
                start_date: '2019-12-12',
                finish_date: '2020-12-12',
                user_id: userId
            };

            let response = await request
                .put(`/contracts/${contractId}`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(updateContract);

            expect(response.body).to.have.property('contract_length');
        });

        it('returns an error if contract_length is blank', async () => {
            let updateContract = {
                contract_length: null
            };

            let response = await request
                .put(`/contracts/${contractId}`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(updateContract);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'contract_length',
                message:
                    'Invalid type of contract. It must be number (1/3/6/12)'
            });
        });
        it('returns an error if start_date is blank', async () => {
            let updateContract = {
                start_date: null
            };

            let response = await request
                .put(`/contracts/${contractId}`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(updateContract);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'start_date',
                message: 'Invalid date format'
            });
        });

        it('returns an error if finish_date is blank', async () => {
            let updateContract = {
                finish_date: null
            };

            let response = await request
                .put(`/contracts/${contractId}`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(updateContract);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'finish_date',
                message: 'Invalid date format'
            });
        });

        it('returns an error if user_id is blank', async () => {
            let updateContract = {
                user_id: null
            };

            let response = await request
                .put(`/contracts/${contractId}`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(updateContract);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'user_id',
                message: 'Id required'
            });
        });

        it('returns 403 when trying to edit somone else', async () => {
            let updateContract = {
                contract_length: 12,
                start_date: '2019-12-12',
                finish_date: '2020-12-12',
                user_id: userId
            };
            let response = await request
                .put(`/contracts/${contractIdBad}`)
                .set('Authorization', 'Bearer ' + loggedUserBadToken)
                .send(updateContract);

            expect(response.statusCode).to.equal(403);
        });

        it("returns 404 if contract hasn't been found", async () => {
            let updateContract = {
                contract_length: 12,
                start_date: '2019-12-12',
                finish_date: '2020-12-12',
                user_id: userId
            };

            let response = await request
                .put(`/contracts/99999999`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(updateContract);

            expect(response.statusCode).to.equal(404);
        });
    });

    describe('DELETE /contracts', async () => {
        it('deletes a contract', async () => {
            let response = await request
                .delete(`/contracts/${contractId}`)
                .set('Authorization', 'Bearer ' + loggedAdminToken);

            expect(response.statusCode).to.equal(204);
        });

        it('returns 403 when trying to delete somone else', async () => {
            let response = await request
                .delete(`/contracts/${contractId}`)
                .set('Authorization', 'Bearer ' + loggedUserBadToken);

            expect(response.statusCode).to.equal(403);
        });

        it("returns 404 if contract hasn't been found", async () => {
            let response = await request
                .delete(`/contracts/9999999`)
                .set('Authorization', 'Bearer ' + loggedAdminToken);

            expect(response.statusCode).to.equal(404);
        });
    });
});
