import Axios from 'axios';

export default {
    getHolidaysByEmployeeId(id) {
        return Axios.get(`employees/${id}/holidays`);
    },

    getEmployeeRequests(id) {
        return Axios.get(`employees/${id}/holidaysRequests`);
    },

    addHolidaysEmployee(holidays) {
        return Axios.post(`employees/${holidays.user_id}/holidays`, holidays);
    },

    editHolidaysEmployee(holidays) {
        return Axios.put(
            `employees/${holidays.user_id}/holidays/${holidays.id}`,
            holidays
        );
    },

    deleteHolidaysEmployee(holidays) {
        return Axios.delete(
            `employees/${holidays.user_id}/holidays/${holidays.id}`
        );
    }
};
