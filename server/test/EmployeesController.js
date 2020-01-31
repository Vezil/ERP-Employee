const app = require('../app');
const request = require('supertest')(app);
const faker = require('faker');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const expect = require('chai').expect;

describe('users', () => {
    describe('POST /employees', () => {
        it('loggin when passing valid data', async () => {
            const userData = {
                email: 'user@erp.test',
                password: 'password'
            };

            const response = await request.post(`/login`).send(userData);

            expect(response.body).to.have.property('token');
        });
    });
});
