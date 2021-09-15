import { actionTypes } from "../actions/types";

const initialState = {
    open: false,
};

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.SET_SIDEBAR:
            state.open = !state.open;
            return { ...state };
        default:
            return state;
    }
};

export default reducer;
