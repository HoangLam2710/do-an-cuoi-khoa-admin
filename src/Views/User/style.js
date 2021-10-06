import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
    return {
        container: {
            margin: "40px auto",
            position: "relative",
        },
        table: {
            minWidth: 650,
            tableLayout: "fixed",
            "& .MuiTableCell-alignLeft": {
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
            },
            "& .MuiTableCell-alignRight": {
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
            },
            "& .MuiTableCell-head": {
                fontWeight: 700,
            },
            [theme.breakpoints.down("xs")]: {
                minWidth: 300,
                "& .hiddenMobile": {
                    display: "none",
                },
            },
        },
        pagination: {
            "& > *": {
                marginTop: theme.spacing(3),
                justifyContent: "center",
            },
        },
        wrapSearch: {
            marginBottom: theme.spacing(5),
            display: "flex",
            [theme.breakpoints.down("xs")]: {
                flexDirection: "column",
            },
            "& form": {
                flexGrow: 1,
                display: "flex",
                position: "relative",
                marginRight: theme.spacing(2),
                [theme.breakpoints.down("xs")]: {
                    marginRight: theme.spacing(0),
                    marginBottom: theme.spacing(2),
                },
                "& .MuiOutlinedInput-notchedOutline": {
                    borderRight: "none",
                },
                "& .MuiFormControl-root": {
                    flexGrow: 1,
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "4px 0 0 4px",
                    },
                },
            },
        },
        buttonSearch: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            borderRadius: "0 4px 4px 0",
            "&:hover": {
                backgroundColor: theme.palette.primary.dark,
            },
        },
        buttonAdd: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            "&:hover": {
                backgroundColor: theme.palette.primary.dark,
            },
        },
        buttonEdit: {
            color: theme.palette.info.main,
            padding: 0,
            "&:hover": {
                backgroundColor: "transparent",
                color: theme.palette.info.dark,
            },
        },
        buttonDelete: {
            color: theme.palette.error.main,
            padding: 0,
            "&:hover": {
                backgroundColor: "transparent",
                color: theme.palette.error.dark,
            },
            marginLeft: theme.spacing(1),
        },
        modal: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(3, 4, 1),
            [theme.breakpoints.down("xs")]: {
                minWidth: 300,
            },
        },
    };
});

export default useStyles;
