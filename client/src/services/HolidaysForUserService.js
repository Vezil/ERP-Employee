import Axios from 'axios';

export default {
    getHolidaysByEmployeeId(id) {
        return Axios.get(`employees/${id}/holidays`);
    },

    getEmployeeRequests(id) {
        return Axios.get(`employees/${id}/holidaysRequests`);
    },

    addHolidaysForEmployee(holidays) {
        return Axios.post(`employees/${holidays.user_id}/holidays`, holidays);
    },

    editHolidaysForEmployee(holidays) {
        return Axios.put(
            `employees/${holidays.user_id}/holidays/${holidays.id}`,
            holidays
        );
    },

    deleteHolidaysForEmployee(holidays) {
        return Axios.delete(
            `employees/${holidays.user_id}/holidays/${holidays.id}`
        );
    }
};
