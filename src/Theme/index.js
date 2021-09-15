import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    palette: {
        primary: {
            light: "#fdcb82",
            main: "#fbbd61",
            dark: "#ec7532",
            contrastText: "#fff",
        },
    },
});

export default theme;
