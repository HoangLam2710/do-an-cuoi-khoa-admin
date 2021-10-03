import React from "react";
import { Route, Redirect } from "react-router-dom";

const createRoute = (condition) => {
    return ({ exact, path, Component, redirectPath }) => {
        return (
            <Route
                exact={exact}
                path={path}
                render={(routeProps) => {
                    if (condition()) {
                        return <Component {...routeProps} />;
                    }
                    return <Redirect to={redirectPath} />;
                }}
            />
        );
    };
};

export const AuthRoute = createRoute(() => localStorage.getItem("t"));
export const PrivateRoute = createRoute(() => !localStorage.getItem("t"));
