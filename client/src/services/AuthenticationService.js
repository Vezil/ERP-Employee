import Axios from 'axios';
require('dotenv').config();

export default {
    login(credentials) {
        return Axios.post('login', credentials);
    }
};
