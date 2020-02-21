import Axios from 'axios';

require('dotenv').config();

export default {
    getHolidays() {
        return Axios.get('holidays');
    },

    addHolidays(holidays) {
        return Axios.post('holidays', holidays);
    },

    newHolidays(holidays) {
        return Axios.post(`holidays/${holidays.id}`, holidays);
    },

    updateHolidays(holidays) {
        return Axios.put(`holidays/${holidays.id}`, holidays);
    },

    updateConfirmedValue(id, newValue) {
        return Axios.put(`/holidays/${id}/confirm`, newValue);
    },
    deleteHolidays(holidays) {
        return Axios.delete(`holidays/${holidays.id}`);
    }
};
