import {SET_THEME} from "./types";

export const setTheme = decoded => {
    return {
        type: SET_THEME,
        payload: decoded
    }
};
