import Api from '@/services/Api'
require('dotenv').config()

export default {
    getAllEmployees() {
        return Api().get('allEmployees')
    },
    addNewEmployee(employee) {
        return Api().post('addEmployee', employee)
    },

}