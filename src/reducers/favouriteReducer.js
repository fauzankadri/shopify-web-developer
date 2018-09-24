import {
    ADD_FAVOURITE,
    REMOVE_FAVOURITE
} from "../actions/actionTypes";

const initialState = {
    allFavourites: [], // initial contact is empty
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_FAVOURITE:
            console.log(action.payload)
            return Object.assign({}, state, {
                allFavourites: [...state.allFavourites, action.payload]
            });
        case REMOVE_FAVOURITE:
            console.log(action.payload)
            return Object.assign({}, state, {
                allFavourites: state.allFavourites.filter(ele => action.payload != ele)
            });
        default:
            return state;
    }
};