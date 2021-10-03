import { actionTypes } from "../actions/types";

const initialState = {
    open: true,
};

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.SET_SIDEBAR:
            state.open = !state.open;
            return { ...state };
        case actionTypes.SET_SIDEBAR_PAGE:
            state.open = payload;
            return { ...state };
        default:
            return state;
    }
};

export default reducer;
