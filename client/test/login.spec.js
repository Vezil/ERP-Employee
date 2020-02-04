import { mount } from '@vue/test-utils';
import Login from '../src/components/pages/Login.vue';

describe('Login.vue', () => {
    test('setup correctly', () => {
        const wrapper = mount(Login);

        expect(wrapper);
        console.log(wrapper);
    });
});
