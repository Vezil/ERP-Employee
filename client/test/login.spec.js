import { mount, createLocalVue } from '@vue/test-utils';
import Login from '../src/components/pages/Login.vue';
import expect from 'expect';
import moxios from 'moxios';
import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

const localVue = createLocalVue();

let vuetify;
let wrapper;

describe('Login.vue', () => {
    beforeAll(() => {
        moxios.stubOnce('POST', 'login', {
            status: 200,
            response: {
                user: {
                    id: 22,
                    email: 'admin@erp.test',
                    name: 'Lucio',
                    surname: 'Dibbert',
                    birthdate: '2019-02-15',
                    days_left: 0,
                    createdAt: '2020-02-05T16:20:10.000Z',
                    updatedAt: '2020-02-05T16:20:10.000Z',
                    UserRole: {
                        id: 22,
                        createdAt: '2020-02-05T16:20:10.000Z',
                        updatedAt: '2020-02-05T16:20:10.000Z',
                        role_id: 1,
                        UserId: 22
                    }
                },
                token:
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsImVtYWlsIjoiYWRtaW5AZXJwLnRlc3QiLCJuYW1lIjoiTHVjaW8iLCJzdXJuYW1lIjoiRGliYmVydCIsImJpcnRoZGF0ZSI6IjIwMTktMDItMTUiLCJkYXlzX2xlZnQiOjAsImNyZWF0ZWRBdCI6IjIwMjAtMDItMDVUMTY6MjA6MTAuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjAtMDItMDVUMTY6MjA6MTAuMDAwWiIsIlVzZXJSb2xlIjp7ImlkIjoyMiwiY3JlYXRlZEF0IjoiMjAyMC0wMi0wNVQxNjoyMDoxMC4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMC0wMi0wNVQxNjoyMDoxMC4wMDBaIiwicm9sZV9pZCI6MSwiVXNlcklkIjoyMn0sImlhdCI6MTU4MDkyMTc1NywiZXhwIjoxNTgxMDA4MTU3fQ.aXt-VzAPq6ek5Z2v4DzI3PuLcdxDCkGjhWfMTuRP8U0'
            }
        });
    });

    beforeEach(done => {
        moxios.install();

        vuetify = new Vuetify();

        wrapper = mount(Login, {
            localVue,
            vuetify
        });

        moxios.wait(() => {
            wrapper.setData({
                email: '',
                password: ''
            });
            done();
        });
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it('have two v-text-field ', () => {
        expect(wrapper.findAll('.v-text-field').length).toBe(2);
    });

    it('Goes through login correctly', () => {
        wrapper.setData({
            email: 'admin@erp.test',
            password: 'password'
        });
        const button = wrapper.find('.v-btn');
        button.trigger('click');
    });
});
