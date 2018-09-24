import { ADD_FAVOURITE, REMOVE_FAVOURITE } from './actionTypes';

export function addFavourite(data) {
    return dispatch => {
        dispatch({
            type: ADD_FAVOURITE,
            payload: data
        });
    }
}

export function removeFavourite(data) {
    return dispatch => {
        dispatch({
            type: REMOVE_FAVOURITE,
            payload: data
        });
    }
}

