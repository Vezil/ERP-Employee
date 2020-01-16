import Api from '@/services/Api'
require('dotenv').config()

export default {
    getHolidaysByEmployeeId(id) {

        return Api().get(`employees/${id}/holidays`)
    },
    getEmployeeRequests(id) {

        return Api().get(`employeesR/${id}/holidays`)
    },
    addHolidaysEmployee(holidays) {

        return Api().post(`employees/${holidays.employeeId}/holidays`, holidays)
    },
    editHolidaysEmployee(holidays) {

        return Api().put(`employees/${holidays.employeeId}/holidays/${holidays.id}`, holidays)
    },
    deleteHolidaysEmployee(holidays) {

        return Api().delete(`employees/${holidays.employeeId}/holidays/${holidays.id}`)
    },
}