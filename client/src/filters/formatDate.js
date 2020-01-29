import moment from 'moment';
import config from '../config';

const formatDate = function(value) {
    if (value) {
        return moment(value).format(config.dateFormat);
    }
};

export default formatDate;
