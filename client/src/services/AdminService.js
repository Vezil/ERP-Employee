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
        console.log(employee)
        return Api().put(`employees/${employee.id}`, employee)
    },

}