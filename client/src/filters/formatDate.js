import moment from 'moment';
import dateFormat from '../config/date';

const formatDate = function(value) {
    if (value) {
        return moment(value).format(dateFormat);
    }
};

export default formatDate;
