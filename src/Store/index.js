import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import admin from "./reducers/admin";
import user from "./reducers/user";
import layout from "./reducers/layout";
import movie from "./reducers/movie";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    admin,
    user,
    layout,
    movie,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;
