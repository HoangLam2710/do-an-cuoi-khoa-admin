import { actionTypes } from "../actions/types";

const initialState = {
  cinemaSystem: null,
  cinemaCluster: null,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_CINEMA_SYSTEM:
      state.cinemaSystem = payload;
      return { ...state };
    case actionTypes.SET_CINEMA_CLUSTER:
      state.cinemaCluster = payload;
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
