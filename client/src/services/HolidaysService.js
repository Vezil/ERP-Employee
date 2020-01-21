import Api from '@/services/Api';
require('dotenv').config();
import { config } from '@/services/Config';

export default {
    getHolidays() {
        return Api().get('holidays');
    },
    addHolidays(holidays) {
        return Api().post('holidays', holidays);
    },

    newHolidays(holidays) {
        return Api().post(`holidays/${holidays.id}`, holidays);
    },
    updateHolidays(holidays) {
        return Api().put(`holidays/${holidays.id}`, holidays);
    },
    deleteHolidays(holidays) {
        return Api().delete(`holidays/${holidays.id}`);
    }
};
