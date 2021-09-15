import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => {
    return {
        margin: {
            margin: "20px 0",
            textAlign: "center",
            "& button": {
                margin: "0 10px",
            },
        },
        error: {
            color: theme.palette.error.contrastText,
            backgroundColor: theme.palette.error.main,
            "&:hover": {
                backgroundColor: theme.palette.error.dark,
            },
        },
    };
});

export default useStyle;
