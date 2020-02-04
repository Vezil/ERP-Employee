const app = require('../app');
const request = require('supertest')(app);
const expect = require('chai').expect;

let loggedAdminToken;
let contractId;
let contractBadId;
let badToken;
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

describe('contracts', async () => {
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

    describe('GET /contracts', () => {
        it('getting all contracts', async () => {
            const response = await request
                .get(`/contracts`)
                .set('Authorization', 'Bearer ' + loggedAdminToken);

            expect(response.body);
        });

        it('returns 403 when trying to get somone else', async () => {
            const response = await request
                .get(`/contracts`)
                .set('Authorization', 'Bearer ' + badToken);

            expect(response.statusCode).to.equal(403);
        });
    });

    describe('POST /contracts', async () => {
        it('adding a new contract', async () => {
            const newContract = {
                contract_length: 12,
                start_date: '2019-12-12',
                finish_date: '2020-12-12',
                user_id: userId,
                holidays_per_year: 20
            };

            const response = await request
                .post(`/contracts`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(newContract);

            contractId = response.body.id;

            expect(response.body).to.have.property('contract_length');
        });

        it('returns an error if contract_length is blank', async () => {
            const newContract = {
                contract_length: null
            };

            const response = await request
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
            const newContract = {
                start_date: null
            };

            const response = await request
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
            const newContract = {
                finish_date: null
            };

            const response = await request
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
            const newContract = {
                user_id: null
            };

            const response = await request
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
            const newContract = {
                holidays_per_year: null
            };

            const response = await request
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
            const newContract = {
                contract_length: 12,
                start_date: '2019-12-12',
                finish_date: '2020-12-12',
                user_id: userId,
                holidays_per_year: 20
            };

            const response = await request
                .post(`/contracts/`)
                .set('Authorization', 'Bearer ' + badToken)
                .send(newContract);

            contractBadId = response.body.id;

            expect(response.statusCode).to.equal(403);
        });
    });

    describe('PUT /contracts', async () => {
        it('editing contract', async () => {
            const updateContract = {
                contract_length: 12,
                start_date: '2019-12-12',
                finish_date: '2020-12-12',
                user_id: userId
            };

            const response = await request
                .put(`/contracts/${contractId}`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(updateContract);

            expect(response.body).to.have.property('contract_length');
        });

        it('returns an error if contract_length is blank', async () => {
            const updateContract = {
                contract_length: null
            };

            const response = await request
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
            const updateContract = {
                start_date: null
            };

            const response = await request
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
            const updateContract = {
                finish_date: null
            };

            const response = await request
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
            const updateContract = {
                user_id: null
            };

            const response = await request
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
            const updateContract = {
                contract_length: 12,
                start_date: '2019-12-12',
                finish_date: '2020-12-12',
                user_id: userId
            };
            const response = await request
                .put(`/contracts/${contractBadId}`)
                .set('Authorization', 'Bearer ' + badToken)
                .send(updateContract);

            expect(response.statusCode).to.equal(403);
        });

        it("returns 404 if contract hasn't been found", async () => {
            const updateContract = {
                contract_length: 12,
                start_date: '2019-12-12',
                finish_date: '2020-12-12',
                user_id: userId
            };

            const response = await request
                .put(`/contracts/99999999`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(updateContract);

            expect(response.statusCode).to.equal(404);
        });
    });

    describe('DELETE /contracts', async () => {
        it('deletes a contract', async () => {
            const response = await request
                .delete(`/contracts/${contractId}`)
                .set('Authorization', 'Bearer ' + loggedAdminToken);

            expect(response.statusCode).to.equal(204);
        });

        it('returns 403 when trying to delete somone else', async () => {
            const response = await request
                .delete(`/contracts/${contractId}`)
                .set('Authorization', 'Bearer ' + badToken);

            expect(response.statusCode).to.equal(403);
        });

        it("returns 404 if contract hasn't been found", async () => {
            const response = await request
                .delete(`/contracts/9999999`)
                .set('Authorization', 'Bearer ' + loggedAdminToken);

            expect(response.statusCode).to.equal(404);
        });
    });
});
