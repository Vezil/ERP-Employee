import { mount, createLocalVue } from '@vue/test-utils';
import Login from '../src/components/pages/Login.vue';
import expect from 'expect';
import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

const localVue = createLocalVue();

let vuetify;
let wrapper;

describe('Login.vue', () => {
    vuetify = new Vuetify();

    beforeEach(() => {
        wrapper = mount(Login, {
            localVue,
            vuetify,
            propsData: {
                email: 'admin@erp.test',
                password: 'password'
            }
        });
    });

    it('have two v-text-field ', () => {
        expect(wrapper.findAll('.v-text-field').length).toBe(2);
    });
    it('Goes through login correctly', () => {
        const button = wraper.findOne('.v-btn');
        button.at(1).trigger('click');

        // expect(wrapper.emitted('login'));
    });
});
