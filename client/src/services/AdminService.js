import Api from '@/services/Api'
require('dotenv').config()

export default {
    getAllEmployees() {
        return Api().get('Employees')
    },
    addNewEmployee(employee) {
        return Api().post('addEmployee', employee)
    },
    updateEmployee(employee) {
        return Api().put(`Employees/${employee.id}`, employee)
    },

}