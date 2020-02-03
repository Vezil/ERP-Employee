const app = require('../app');
const request = require('supertest')(app);
const expect = require('chai').expect;
const bcrypt = require('bcrypt');
const saltRounds = 10;

let loggedAdminToken;
let holidaysId;
let userId = 1;

describe('employees', async () => {
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

    describe('GET /employees', () => {
        it('getting all employees data', async () => {
            let response = await request
                .get(`/employees`)
                .set('Authorization', 'Bearer ' + loggedAdminToken);

            expect(response.body);
        });
    });

    describe('POST /employees', async () => {
        it('adding a new employee', async () => {
            const salt = await bcrypt.genSalt(saltRounds);

            let newEmployee = {
                email: 'testEmployee@test.erp',
                name: 'test',
                surname: 'surtest',
                password: await bcrypt.hash('password', salt),
                birthdate: '1997-11-11',
                days_left: 0
            };

            let response = await request
                .post(`/employees`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(newEmployee);

            console.log(response.body);
            expect(response.body).to.have.property('email');
        });

        it('returns an error if email is blank', async () => {
            let newEmployee = {
                email: null
            };

            let response = await request
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
            let newEmployee = {
                name: null
            };

            let response = await request
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
            let newEmployee = {
                surname: null
            };

            let response = await request
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
            let newEmployee = {
                password: null
            };

            let response = await request
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
            let newEmployee = {
                birthdate: null
            };

            let response = await request
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
            let newEmployee = {
                days_left: null
            };

            let response = await request
                .post(`/employees`)
                .set('Authorization', 'Bearer ' + loggedAdminToken)
                .send(newEmployee);

            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.deep.include({
                param: 'days_left',
                message: 'Invalid days_left format'
            });
        });
    });
});
