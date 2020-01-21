import Api from '@/services/Api';
import Axios from 'axios';

require('dotenv').config();

export default {
    create() {},

    getAllEmployees() {
        console.log(Axios.defaults);
        return Axios.get('employees');
    },

    addNewEmployee(employee) {
        return Api().post('employees', employee);
    },

    updateEmployee(employee) {
        return Api().put(`employees/${employee.id}`, employee);
    },

    deleteEmployee(employee) {
        return Api().delete(`employees/${employee.id}`, employee);
    },

    getOneEmployee(id) {
        return Api().get(`employees/${id}`);
    }
};
