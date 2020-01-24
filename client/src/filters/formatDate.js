import moment from 'moment';

const formatDate = function(value) {
    if (value) {
        return moment(value).format('DD/MM/YYYY');
    }
};

export default formatDate;
