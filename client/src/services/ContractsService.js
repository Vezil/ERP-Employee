import Axios from 'axios';
require('dotenv').config();

export default {
    addContract(contract) {
        return Axios.post('contracts', contract);
    },

    getContracts() {
        return Axios.get('contracts');
    },

    getContractsEmployee(id) {
        return Axios.get(`employees/${id}/contracts`);
    },

    updateContract(contract) {
        return Axios.put(`contracts/${contract.id}`, contract);
    },

    deleteContract(contract) {
        return Axios.delete(`contracts/${contract.id}`);
    }
};
