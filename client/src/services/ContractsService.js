import Api from '@/services/Api';
require('dotenv').config();

export default {
    addContract(contract) {
        return Api().post('contracts', contract);
    },
    getAllContracts() {
        return Api().get('contracts');
    },
    updateContract(contract) {
        return Api().put(`contracts/${contract.id}`, contract);
    },

    deleteContract(contract) {
        return Api().delete(`contracts/${contract.id}`, contract);
    }
};
