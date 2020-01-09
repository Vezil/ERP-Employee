require('dotenv').config()
import axios from 'axios'


console.log(process.env.VUE_APP_SERVER_URL)
console.log(process.env.VUE_APP_TEST)

export default () => {
    return axios.create({
        baseURL: process.env.SERVER_URL || `http://localhost:9001/`
    })
}