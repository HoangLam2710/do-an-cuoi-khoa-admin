import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => {
    return {
        textField: {
            width: 400,
            [theme.breakpoints.down("xs")]: {
                width: "100%",
            },
        },
        margin: {
            margin: "20px 0",
        },
        formControl: {
            minWidth: 400,
            [theme.breakpoints.down("xs")]: {
                minWidth: "100%",
            },
        },
    };
});

export default useStyle;
