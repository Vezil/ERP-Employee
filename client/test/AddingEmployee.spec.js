import { mount, createLocalVue } from '@vue/test-utils';
import AdminDashboard from '../src/components/pages/AdminDashboard.vue';
import expect from 'expect';
import moxios from 'moxios';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import moment from 'moment';

const localVue = createLocalVue();

Vue.use(Vuetify);
Vue.use(require('vue-moment'));
Vue.use(Vuex);

let vuetify;
let wrapper;
let actions;
let store;

describe('AdminDashboard.vue', () => {
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

        wrapper = mount(AdminDashboard, {
            localVue,
            vuetify,
            store,
            moment
        });

        done();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it('Add new employee correctly', async done => {
        moxios.stubOnce('POST', 'users', {
            status: 201,
            resposne: {
                id: ''
            }
        });

        expect(wrapper.html()).toContain('No data available');

        const button = wrapper.find('.v-btn.newEmployeeButton');

        button.trigger('click');

        wrapper.setData({
            isDialogOpen: true,
            editedItem: {
                name: 'Roronoa',
                surname: 'Zoro',
                birthdate: '1998-11-11',
                email: 'RoronoaZoro@erp.test',
                days_left: 0
            }
        });

        await wrapper.vm.$nextTick();

        const save = wrapper.find('button.save');
        save.trigger('click');

        wrapper.setData({
            employees: [
                {
                    name: 'Roronoa',
                    surname: 'Zoro',
                    birthdate: '1998-11-11',
                    email: 'RoronoaZoro@erp.test',
                    days_left: 0
                }
            ],
            isDialogOpen: false
        });

        expect(wrapper.vm.employees).toStrictEqual([
            {
                name: 'Roronoa',
                surname: 'Zoro',
                birthdate: '1998-11-11',
                email: 'RoronoaZoro@erp.test',
                days_left: 0
            }
        ]);

        expect(wrapper.vm.isDialogOpen).toBe(false);

        moxios.wait(() => {
            expect(wrapper.html('Roronoa'));

            done();
        });
    });

    it('Returns error when some field is null', async done => {
        expect(wrapper.html()).toContain('No data available');

        const button = wrapper.find('.v-btn.newEmployeeButton');

        button.trigger('click');

        wrapper.setData({
            error: null,
            isDialogOpen: true,
            editedItem: {
                name: null,
                surname: null,
                birthdate: null,
                email: null,
                days_left: null
            }
        });

        await wrapper.vm.$nextTick();

        const save = wrapper.find('button.save');
        save.trigger('click');

        wrapper.setData({
            error: 'All fields are required !'
        });

        await wrapper.vm.$nextTick();

        expect(wrapper.html()).toContain('All fields are required !');

        done();
    });
});
