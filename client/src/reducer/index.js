import {
    GET_ALL_COUNTRIES,
    GET_ALL_ACTIVITIES,
    FILTER_BY_CONTINENT,
    FILTER_BY_ACTIVITY,
    ORDER_BY_NAME,
    ORDER_BY_POPULATION,
    GET_COUNTRY_DETAIL,
    GET_COUNTRY_NAME,
    POST_ACTIVITY
} from "../actions";

const initialState = {
    countries: [],
    allCountries: [],
    details: [],
    activities: []

}

function rootReducer(state = initialState, action) {

    switch (action.type) {
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }
        case GET_ALL_ACTIVITIES:
            return {
                ...state,
                activities: action.payload
            }
        case GET_COUNTRY_NAME:
            return {
                ...state,
                countries: action.payload
            }
        case GET_COUNTRY_DETAIL:
            return {
                ...state,
                details: action.payload
            }
        case FILTER_BY_CONTINENT:{
            const allCountries = state.allCountries 
            const americans = allCountries.filter(el => el.continent === "North America" || el.continent === "South America")
            const filtered = action.payload === "America" ? americans : allCountries.filter(el => el.continent === action.payload)
            
            return {
                ...state,
                countries: filtered   
            }
        }
        case FILTER_BY_ACTIVITY: {
            const withActivities = state.allCountries.filter(el => el.activities?.length > 0)
            const filtered = withActivities.filter(el => el.activities.map(a => a.name).includes(action.payload))

            return {
                ...state,
                countries: filtered,
            }
        }
        case ORDER_BY_NAME: {
            let countries = [...state.countries]
            let sorted = action.payload === "az" ?
                countries.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    return 0;
                }) :
                countries.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (a.name < b.name) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                countries: sorted
            }
        }
        case ORDER_BY_POPULATION: {
            let countries = [...state.countries]
            let sortedArray = action.payload === "asc" ?
                countries.sort(function (a, b) {
                    if (a.population > b.population) {
                        return 1;
                    }
                    if (a.population < b.population) {
                        return -1;
                    }
                    return 0;
                }) :
                countries.sort(function (a, b) {
                    if (a.population > b.population) {
                        return -1;
                    }
                    if (a.population < b.population) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                countries: sortedArray
            }
        }
        case POST_ACTIVITY:
            return {
                ...state,
                activities: action.payload
            }
        default: return state;
    }
}

export default rootReducer;