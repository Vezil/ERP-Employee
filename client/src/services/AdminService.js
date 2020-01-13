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
        return Api().put(`employees/${employee.id}`, employee)
    },

    deleteEmployee(employee) {
        return Api().delete(`employees/${employee.id}`, employee)
    },

    getOneEmployee(email) {
        return Api().get(`employees/${email}`)
    },

    getHolidays() {
        return Api().get('holidays')
    },

    addContract(contract) {
        return Api().post('contracts', contract)
    },
    addHolidays(holidays) {
        return Api().post('holidays', holidays)
    },

}