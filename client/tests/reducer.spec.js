import rootReducer from '../src/reducer/index';
import {
    getCountries,
    getCountryDetail,
    postActivity,
    GET_ALL_COUNTRIES,
    GET_COUNTRY_DETAIL,
    POST_ACTIVITY
} from '../src/actions';
import data from '../db.json';

describe('Reducer', () => {
    const state = {
        countries: [],
    };

    it('Debería retornar el estado inicial si no se pasa un type válido', () => {
        expect(rootReducer(undefined, [])).toEqual({
            countries: [],
        });
    });

    it('Debería guardar en el state los paises obtenidos cuando action type es "GET_ALL_COUNTRIES"', () => {
        const result = rootReducer(state, {
            type: GET_ALL_COUNTRIES,
            payload: data.countries,
        });
        expect(result).not.toEqual(state);
        expect(result).toEqual({
            countries: data.countries,
        });
    });

    it('Debería guardar en el state el pais obtenido cuando action type es "GET_COUNTRY_DETAIL"', () => {
        const result = rootReducer(state, {
            type: GET_COUNTRY_DETAIL,
            payload: data.countries[0],
        });
        expect(result).not.toEqual(state);
        expect(result).toEqual({
            countries: [],
            details: data.countries[0],
        });
    });

    it('Debería crear una nueva actividad y guardarla en nuestro estado cuando action type es "POST_ACTIVITY"', () => {
        const state = {
            countries: data.countries,
            details: data.countries[0],
            activities: [],
        };

        const payload1 = {
            name: 'Ski',
            dificulty: 4,
            duration: 3,
            season: 'winter',
        };

        const payload2 = {
            name: 'Rafting',
            dificulty: 3,
            duration: 2,
            season: 'spring',
        };

        const allActivitiesType1 = [
            ...data.activities,
            {
                id: 1,
                name: 'Ski',
                dificulty: 4,
                duration: 3,
                season: 'winter',
            },
        ];
        const allActivitiesType2 = [
            ...allActivitiesType1,
            {
                id: 2,
                name: 'Rafting',
                dificulty: 3,
                duration: 2,
                season: 'spring',
            },
        ];
        const firstActivity = rootReducer(state, postActivity(payload1));
        const secondActivity = rootReducer(
            { ...state, activities: allActivitiesType1 },
            postActivity(payload2),
        );

        
        expect(firstActivity).not.toEqual(state);
        expect(secondActivity).not.toEqual(state);

        expect(firstActivity).toEqual({
            countries: data.countries,
            details: data.countries[0],
            activities: allActivitiesType1,
        });
        expect(secondActivity).toEqual({
            countries: data.countries,
            details: data.countries[0],
            activities: allActivitiesType2,
        });
    });
});

