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
            vuetify
        });
    });

    it('have two v-text-field ', () => {
        expect(wrapper.findAll('.v-text-field').length).toBe(2);
    });
});
