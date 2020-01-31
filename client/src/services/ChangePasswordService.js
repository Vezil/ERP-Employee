import Axios from 'axios';
require('dotenv').config();

export default {
    changePassword(request) {
        return Axios.put(`auth/changePassword`, request);
    }
};
