import { actionTypes } from "../actions/types";

const initialState = {
    userList: null,
    userEdit: null, // quản lý tài khoản edit and delele
    open: false,
    contentModal: null, // modal sẽ mở edit, add hoặc delete
    page: 1,
};

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.SET_USERLIST:
            state.userList = payload;
            return { ...state };
        case actionTypes.SET_USER_EDIT:
            state.userEdit = payload;
            return { ...state };
        case actionTypes.SET_OPEN:
            state.open = payload;
            return { ...state };
        case actionTypes.SET_EDIT:
            state.contentModal = payload;
            return { ...state };
        case actionTypes.SET_PAGE:
            state.page = payload;
            return { ...state };
        default:
            return state;
    }
};

export default reducer;
