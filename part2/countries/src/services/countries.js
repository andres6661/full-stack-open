import axios from "axios"

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const showAll = () =>{
    return axios.get(baseUrl)
}

export default {
    showAll
}