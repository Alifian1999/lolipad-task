import axios from 'axios'

const API = axios.create({
    baseURL:'https://restcountries.eu/rest/v2/'
})

export default API