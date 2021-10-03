import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Views/Home";
import User from "./Views/User";
import Movie from "./Views/Movie";
import PageNotFound from "./Views/PageNotFound";
import { ThemeProvider } from "@material-ui/core";
import theme from "./Theme";
import { AuthRoute, PrivateRoute } from "./HOC/Route";

const App = () => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Switch>
                    <PrivateRoute
                        path="/"
                        exact
                        Component={Home}
                        redirectPath="/user"
                    />
                    <AuthRoute path="/user" Component={User} redirectPath="/" />
                    <AuthRoute
                        path="/movie"
                        Component={Movie}
                        redirectPath="/"
                    />
                    <Route path="*" component={PageNotFound} />
                </Switch>
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;
