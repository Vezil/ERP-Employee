import { mount, createLocalVue } from '@vue/test-utils';
import Login from '../src/components/pages/Login.vue';
import Dashboard from '../src/components/pages/Dashboard.vue';
import expect from 'expect';
import moxios from 'moxios';
import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Router from 'vue-router';

const localVue = createLocalVue();

Vue.use(Vuetify);
Vue.use(Vuex);
Vue.use(VueRouter);

let vuetify;
let wrapper;
let actions;
let store;

describe('Login.vue', () => {
    beforeEach(done => {
        actions = {
            setUser: jest.fn(),
            setToken: jest.fn(),
            setRole: jest.fn()
        };
        store = new Vuex.Store({
            actions
        });

        moxios.install();

        vuetify = new Vuetify();

        const routes = [
            {
                path: '/',
                name: 'dashboard',
                component: Dashboard
            }
        ];

        const router = new VueRouter({
            routes
        });

        const routerPush = Router.prototype.push;
        Router.prototype.push = function push(location) {
            return routerPush.call(this, location).catch(error => error);
        };

        wrapper = mount(Login, {
            localVue,
            vuetify,
            store,
            router
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

    it('Goes through login correctly', done => {
        moxios.stubOnce('POST', 'login', {
            status: 200,
            response: {
                user: {
                    Roles: []
                },
                token: ''
            }
        });

        wrapper.setData({
            email: 'user@erp.test',
            password: 'password'
        });

        const button = wrapper.find('.v-btn');
        button.trigger('click');

        moxios.wait(() => {
            expect(wrapper.contains('div.error')).toBe(false);
            done();
        });
    });

    it('Returns error when email and password are blank', done => {
        moxios.stubOnce('POST', 'login', {
            status: 422,
            response: {
                errors: [
                    { message: 'Invalid value', param: 'email' },
                    {
                        message: 'Email is required and min length is 5 chars',
                        param: 'email'
                    },
                    {
                        message:
                            'Password is required and min length is 8 chars',
                        param: 'password'
                    }
                ]
            }
        });

        wrapper.setData({
            email: 'as',
            password: 'da'
        });

        const button = wrapper.find('.v-btn');
        button.trigger('click');

        moxios.wait(() => {
            expect(wrapper.contains('div.error')).toBe(true);
            expect(wrapper.contains('.v-text-field.login')).toBe(true);
            done();
        });
    });
});
