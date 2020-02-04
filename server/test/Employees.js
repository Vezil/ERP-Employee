const app = require('../app');
const request = require('supertest')(app);
const expect = require('chai').expect;
const bcrypt = require('bcrypt');
const saltRounds = 10;

let loggedAdminToken;
let userId;

const loggedAdminBadToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImVtYWlsIjoiS2VuZGFsbC5TdHJvc2luQGhvdG1haWwuY29tIiwibmFtZSI6IklkZWxsYSIsInN1cm5hbWUiOiJDYXJ0ZXIiLCJiaXJ0aGRhdGUiOiIyMDE5LTA4LTAzIiwiZGF5c19sZWZ0IjoyNiwiY3JlYXRlZEF0IjoiMjAyMC0wMS0zMVQxNjowNDo1Ny4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMC0wMS0zMVQxNjowNDo1Ny4wMDBaIiwiUm9sZSI6eyJpZCI6MTcsIm5hbWUiOiJ1c2VyIiwiY3JlYXRlZEF0IjoiMjAyMC0wMS0zMVQxNjowNDo1OC4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMC0wMS0zMVQxNjowNDo1OC4wMDBaIiwidXNlcl9pZCI6MTcsIlVzZXJJZCI6MTd9LCJpYXQiOjE1ODA3Mjc1NDYsImV4cCI6MTU4MDgxMzk0Nn0.2Xmsj3nGaIuAfzw6Q1tAvEj2ZAGGWWtDzJGnnlpKtwo';

describe('employees', async () => {
    it('login when passing valid data', async () => {
        const adminData = {
            email: 'admin@erp.test',
            password: 'password'
        };

        const response = await request.post(`/login`).send(adminData);

        expect(response.body).to.have.property('token');

        loggedAdminToken = response.body.token;
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

    describe('GET /employees', () => {
        it('getting all employees data', async () => {
            const response = await request
                .get(`/employees`)
                .set('Authorization', 'Bearer ' + loggedAdminToken);

            expect(response.body);

            it('returns 403 when trying to get employee somone else', async () => {
                const response = await request
                    .get(`/employees`)
                    .set('Authorization', 'Bearer ' + loggedAdminToken);

                expect(response.statusCode).to.equal(403);
            });
        });
    });

    describe('POST /employees', async () => {
        it('adding a new employee', async () => {
            const salt = await bcrypt.genSalt(saltRounds);

            const newEmployee = {
                email: 'testEmployee@test.erp',
                name: 'test',
                surname: 'surtest',
                password: await bcrypt.hash('password', salt),
                birthdate: '1997-11-11',
                days_left: 0
            };

            const response = await request
                .post(`/employees`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(newEmployee);

            userId = response.body.id;

            expect(response.body).to.have.property('email');
        });

        it('returns an error if email is blank', async () => {
            const newEmployee = {
                email: null
            };

            const response = await request
                .post(`/employees`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(newEmployee);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'email',
                message: 'Email is required and min length is 5 chars'
            });
        });
        it('returns an error if name is blank', async () => {
            const newEmployee = {
                name: null
            };

            const response = await request
                .post(`/employees`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(newEmployee);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'name',
                message:
                    'Invalid name format. Min length is 3 chars. Max length is 20 chars'
            });
        });

        it('returns an error if surname is blank', async () => {
            const newEmployee = {
                surname: null
            };

            const response = await request
                .post(`/employees`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(newEmployee);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'surname',
                message:
                    'Invalid surname format. Min length is 3 chars. Max length is 30 chars'
            });
        });

        it('returns an error if password is blank', async () => {
            const newEmployee = {
                password: null
            };

            const response = await request
                .post(`/employees`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(newEmployee);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'password',
                message: 'Password is required and min length is 8 chars'
            });
        });

        it('returns an error if birthdate is blank', async () => {
            const newEmployee = {
                birthdate: null
            };

            const response = await request
                .post(`/employees`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(newEmployee);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'birthdate',
                message: 'Invalid date format'
            });
        });

        it('returns an error if days_left is blank', async () => {
            const newEmployee = {
                days_left: null
            };

            const response = await request
                .post(`/employees`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(newEmployee);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'days_left',
                message: 'Invalid days_left format'
            });
        });

        it('returns an error if email is already in use', async () => {
            const salt = await bcrypt.genSalt(saltRounds);

            const newEmployee = {
                email: 'testEmployee@test.erp',
                name: 'test',
                surname: 'surtest',
                password: await bcrypt.hash('password', salt),
                birthdate: '1997-11-11',
                days_left: 0
            };

            const response = await request
                .post(`/employees`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(newEmployee);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'email',
                message: 'This email is already in use'
            });
        });

        it('returns 403 when trying to add employee somone else', async () => {
            const salt = await bcrypt.genSalt(saltRounds);

            const newEmployee = {
                email: 'testEmployee@test.erp',
                name: 'test',
                surname: 'surtest',
                password: await bcrypt.hash('password', salt),
                birthdate: '1997-11-11',
                days_left: 0
            };

            const response = await request
                .post(`/employees`)
                .set('Authorization', 'Bearer ' + loggedAdminBadToken)
                .send(newEmployee);

            expect(response.statusCode).to.equal(403);
        });
    });

    describe('PUT /employees', async () => {
        it('updating employee', async () => {
            const updateEmployee = {
                email: 'testEmployee@test.erp',
                name: 'test123',
                surname: 'surtest123',
                birthdate: '1997-11-11',
                days_left: 0
            };

            const response = await request
                .put(`/employees/${userId}`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(updateEmployee);

            expect(response.body).to.have.property('email');
        });

        it('returns an error if email is blank', async () => {
            const updateEmployee = {
                email: null
            };

            const response = await request
                .put(`/employees/${userId}`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(updateEmployee);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'email',
                message: 'Email is required and min length is 5 chars'
            });
        });
        it('returns an error if name is blank', async () => {
            const updateEmployee = {
                name: null
            };

            const response = await request
                .put(`/employees/${userId}`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(updateEmployee);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'name',
                message:
                    'Invalid name format. Min length is 3 chars. Max length is 20 chars'
            });
        });

        it('returns an error if surname is blank', async () => {
            const updateEmployee = {
                surname: null
            };

            const response = await request
                .put(`/employees/${userId}`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(updateEmployee);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'surname',
                message:
                    'Invalid surname format. Min length is 3 chars. Max length is 30 chars'
            });
        });

        it('returns an error if birthdate is blank', async () => {
            const updateEmployee = {
                birthdate: null
            };

            const response = await request
                .put(`/employees/${userId}`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(updateEmployee);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'birthdate',
                message: 'Invalid date format'
            });
        });

        it('returns an error if days_left is blank', async () => {
            const updateEmployee = {
                days_left: null
            };

            const response = await request
                .put(`/employees/${userId}`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(updateEmployee);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'days_left',
                message: 'Invalid days_left format'
            });
        });

        it('returns 403 if trying to update employee somone else', async () => {
            const updateEmployee = {
                email: 'testEmployee@test.erp',
                name: 'test123',
                surname: 'surtest123',
                birthdate: '1997-11-11',
                days_left: 0
            };

            const response = await request
                .put(`/employees/${userId}`)
                .set('Authorization', 'Bearer ' + loggedAdminBadToken)
                .send(updateEmployee);

            expect(response.statusCode).to.equal(403);
        });

        it("returns 404 if employee hasn't been found", async () => {
            const updateEmployee = {
                email: 'testEmployee@test.erp',
                name: 'test123',
                surname: 'surtest123',
                birthdate: '1997-11-11',
                days_left: 0
            };

            const response = await request
                .put(`/employees/9999999999`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(updateEmployee);

            expect(response.statusCode).to.equal(404);
        });
    });

    describe('DELETE /employees', async () => {
        it('deletes a employee', async () => {
            const response = await request
                .delete(`/employees/${userId}`)
                .set('Authorization', 'Bearer ' + loggedAdminToken);

            expect(response.statusCode).to.equal(204);
        });

        it('returns 403 when trying to delete somone else', async () => {
            const response = await request
                .delete(`/employees/${userId}`)
                .set('Authorization', 'Bearer ' + loggedAdminBadToken);

            expect(response.statusCode).to.equal(403);
        });

        it("returns 404 if employee hasn't been found", async () => {
            const response = await request
                .delete(`/employees/${userId}`)
                .set('Authorization', 'Bearer ' + loggedAdminToken);

            expect(response.statusCode).to.equal(404);
        });
    });
});
