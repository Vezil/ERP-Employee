import Api from '@/services/Api'
require('dotenv').config()

export default {
    getHolidaysByEmployeeId(id) {

        return Api().get(`employees/${id}/holidays`)
    },
}