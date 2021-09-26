import { actionTypes } from "../actions/types";

const initialState = {
  movieList: null,
  page: 1,
  open: false,
  isEdit: false,
  movieEdit: null,
  contentModal: null,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_MOVIELIST:
      state.movieList = payload;
      return { ...state };
    case actionTypes.SET_PAGE_MOVIE:
      state.page = payload;
      return { ...state };
    case actionTypes.SET_OPEN:
      state.open = payload;
      return { ...state };
    case actionTypes.SET_EDIT_PAGEMOVIE:
      state.isEdit = payload;
      return { ...state };
    case actionTypes.SET_MOIVE_EDIT:
      state.movieEdit = payload;
      return { ...state };
    default:
      return state;
  }
};

export default reducer;