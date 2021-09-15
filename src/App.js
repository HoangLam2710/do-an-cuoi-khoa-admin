import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Views/Home";
import User from "./Views/User";
import Movie from "./Views/Movie";
import PageNotFound from "./Views/PageNotFound";
import Layout from "./HOC/Layout";
import { ThemeProvider } from "@material-ui/core";
import theme from "./Theme";

const App = () => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Layout path="/">
                        <Route path="/user" component={User} />
                        <Route path="/movie" component={Movie} />
                    </Layout>
                    <Route path="*" component={PageNotFound} />
                </Switch>
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;
