const app = require('../app');
const request = require('supertest')(app);
const faker = require('faker');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const expect = require('chai').expect;

describe('user', () => {
    describe('POST /login', () => {
        it('login when passing valid data', async () => {
            const userData = {
                email: 'user@erp.test',
                password: 'password'
            };

            const response = await request.post(`/login`).send(userData);

            expect(response.body).to.have.property('token');

            describe('GET /userHolidays', () => {
                it('getting data of this user', async () => {
                    await request
                        .get(`/employees/${response.body.id}/holidays`)
                        .set('Authorization', 'Bearer ' + response.body.token);

                    expect(response.body);
                });
            });

            describe('POST /userHolidays', () => {
                it('sending request for holidays to admin', async () => {
                    const userHolidaysRequest = {
                        start_date: '2019-01-12',
                        finish_date: '2019-01-13',
                        user_id: response.body.id
                    };
                    await request
                        .get(`/employees/${response.body.id}/holidays`)
                        .send(userHolidaysRequest);

                    expect(response.body);
                });
            });
        });
    });
});
