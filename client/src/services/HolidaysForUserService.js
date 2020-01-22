import Axios from 'axios';

export default {
    getHolidaysByEmployeeId(id) {
        return Axios.get(`employees/${id}/holidays`);
    },

    getEmployeeRequests(id) {
        return Axios.get(`employees/${id}/holidaysRequests`);
    },

    addHolidaysEmployee(holidays) {
        return Axios.post(
            `employees/${holidays.employeeId}/holidays`,
            holidays
        );
    },

    editHolidaysEmployee(holidays_Id) {
        return Axios.put(
            `employees/${holidays_Id.employeeId}/holidays/${holidays_Id.id}`,
            holidays
        );
    },

    deleteHolidaysEmployee(holidays_Id) {
        return Axios.delete(
            `employees/${holidays_Id.employeeId}/holidays/${holidays_Id.id}`
        );
    }
};
