import moment from 'moment';

const formatDate = function(value) {
    if (value) {
        return moment(value).format('YYYY-MM-DD');
    }
};

export default formatDate;
