import axios from 'axios';
import {
    WEATHER_KEY,
    URLAPI_SHOWMOVIE,
    URLAPI_WEATHER
} from '../constants'

export const getShowsMovie = function (params = '') {
    return axios.get(`${URLAPI_SHOWMOVIE}/search/shows?${params}`).then(res => res.data)
}
export const getShowDetail = function (id) {
    return axios.get(`${URLAPI_SHOWMOVIE}/shows/${id}`).then(res => res.data)
}
export const getCurrentWeather = function (params = '') {
    return axios.get(`${URLAPI_WEATHER}/weather?appid=${WEATHER_KEY}&${params}`).then(res => res.data)
}

export default {}