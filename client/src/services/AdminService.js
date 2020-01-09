import Api from '@/services/Api'

export default {
    getAllEmployees() {
        return Api().get('allEmployees')
    }
}