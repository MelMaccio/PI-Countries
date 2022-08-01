
import axios from "axios";

export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_ALL_ACTIVITIES = "GET_ALL_ACTIVITIES";
export const GET_COUNTRY_NAME = "GET_COUNTRY_NAME";
export const GET_COUNTRY_DETAIL = "GET_COUNTRY_DETAIL";
export const POST_ACTIVITY = "POST_ACTIVITY";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_POPULATION = "ORDER_BY_POPULATION";



export function getCountries() {
    return function (dispatch) {
        return fetch("http://localhost:3001/api/countries")
         .then((response) => response.json())
         .then((json) => dispatch({ type: GET_ALL_COUNTRIES, payload: json }))
    }
}

export function getActivities(){
    return function (dispatch) {
        return fetch("http://localhost:3001/api/activities")
         .then((response) => response.json())
         .then((json) => dispatch({ type: GET_ALL_ACTIVITIES, payload: json }))
    }
}

export function getNameCountry(name){
    return function (dispatch) {
        return fetch("http://localhost:3001/api/countries?name=" + name)
         .then((response) => response.json())
         .then((json) => dispatch({ type: GET_COUNTRY_NAME , payload: json }))
    }
}

export function getCountryDetail(id){
    return function (dispatch) {
        return fetch("http://localhost:3001/api/countries/" + id)
         .then((response) => response.json())
         .then((json) => dispatch({ type: GET_COUNTRY_DETAIL, payload: json }))
    }
}

export function postActivity(payload){
    return async function(dispatch){
       const response = axios.post("http://localhost:3001/api/activities", payload)
       return response;
    }
}

export function filterByContinent(payload){
    return{
        type: FILTER_BY_CONTINENT,
        payload
    }
}

export function filterByActivity(payload){
    return{
        type: FILTER_BY_ACTIVITY,
        payload
    }
}

export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload
    }
}

export function orderByPopulation(payload){
    return{
        type: ORDER_BY_POPULATION,
        payload
    }
}


