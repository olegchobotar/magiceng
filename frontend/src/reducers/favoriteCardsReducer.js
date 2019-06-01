import { SET_FAVORITE_CARDS } from '../actions/types';

const initialState = {};

export default function(state = initialState, action ) {
    switch(action.type) {
        case SET_FAVORITE_CARDS:
            return {
                ...state,
                favoriteCards: action.payload
            };
        default:
            return state;
    }
}
