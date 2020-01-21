import Api from '@/services/Api';
import { config } from '@/services/Config';

require('dotenv').config();

export default {
    getAllEmployees() {
        return Api().get('employees', config);
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
