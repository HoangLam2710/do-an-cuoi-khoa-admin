import { actionTypes } from "../actions/types";

const initialState = null;

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.SET_ADMIN:
            state = payload;
            return { ...state };
        case actionTypes.REMOVE_ADMIN:
            state = null;
            return { ...state };
        default:
            return state;
    }
};

export default reducer;
