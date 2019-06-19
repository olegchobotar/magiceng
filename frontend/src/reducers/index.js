import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import favoriteCardsReducer from './favoriteCardsReducer';
import categoriesReducer from './categoriesReducer';
import themeReducer from './themeReducer';

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    favoriteCards: favoriteCardsReducer,
    theme: themeReducer,
    categories: categoriesReducer,
});
