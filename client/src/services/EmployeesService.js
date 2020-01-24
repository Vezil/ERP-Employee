import Axios from 'axios';

require('dotenv').config();

export default {
    create(credentials) {
        return Axios.post('employees', credentials);
    },

    getAllEmployees() {
        return Axios.get('employees');
    },

    updateEmployee(employee) {
        return Axios.put(`employees/${employee.id}`, employee);
    },

    deleteEmployee(employee) {
        return Axios.delete(`employees/${employee.id}`);
    },

    getEmployeeById(id) {
        return Axios.get(`employees/${id}`);
    }
};
