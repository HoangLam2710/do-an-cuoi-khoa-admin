import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => {
    return {
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.down("xs")]: {
                marginRight: theme.spacing(0),
            },
        },
        title: {
            flexGrow: 1,
            [theme.breakpoints.down("xs")]: {
                fontSize: "1rem",
            },
        },
        title2: {
            [theme.breakpoints.down("xs")]: {
                fontSize: ".75rem",
            },
        },
    };
});

export default useStyle;
