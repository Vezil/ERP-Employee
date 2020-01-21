require('dotenv').config();
import Api from '@/services/Api';
import { config } from '@/services/Config';

export default {
    create(credentials) {
        return Api().post('create', credentials);
    },
    login(credentials) {
        return Api().post('login', credentials, config);
    }
};
