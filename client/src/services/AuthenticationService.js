import Api from '@/services/Api'

export default {
    create(credentials){
        return Api().post('create', credentials)
    },
    login(credentials){
        return Api().post('login', credentials)
    },
}