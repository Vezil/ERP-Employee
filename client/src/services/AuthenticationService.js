require('dotenv').config();
import Api from '@/services/Api';
import { config } from '@/services/Config';

console.log(config);

export default {
    // create(credentials) {
    //     return Api().post('/employees', credentials);
    // },
    login(credentials) {
        return Api().post('login', credentials);
    }
};
