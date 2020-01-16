import Api from '@/services/Api'
require('dotenv').config()

export default {
    getHolidaysByEmployeeId(id) {

        return Api().get(`employees/${id}/holidays`)
    },
    getEmployeeRequests(id) {

        return Api().get(`employeesR/${id}/holidays`)
    },
    addHolidaysForEmployee(holidays) {

        return Api().post(`employees/${holidays.employeeId}/holidays`, holidays)
    },
}