import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => {
    return {
        sidebar: {
            width: 300,
            [theme.breakpoints.down("sm")]: {
                width: 300,
                opacity: 1,
                visibility: "visible",
                transition: "all .3s",
            },
            position: "fixed",
            left: 0,
            top: 0,
            height: "100%",
            background: theme.palette.primary.dark,
            padding: 0,
            transition: "width .2s",
            "& .MuiList-root": {
                "& li": {
                    padding: 0,
                    paddingLeft: "2rem",
                    marginBottom: "1.2rem",
                    "& a": {
                        width: "100%",
                        borderRadius: 0,
                        display: "flex",
                        textDecoration: "none",
                        padding: ".5rem",
                        transition: "all .2s",
                        "&.active": {
                            background: theme.palette.primary.contrastText,
                            color: theme.palette.primary.dark,
                            borderRadius: "30px 0 0 30px",
                            "& .MuiListItemIcon-root": {
                                color: theme.palette.primary.dark,
                            },
                            "& .MuiListItemText-root": {
                                "& .MuiTypography-body1": {
                                    color: theme.palette.primary.dark,
                                },
                            },
                        },
                        "& .MuiListItemIcon-root": {
                            color: theme.palette.primary.contrastText,
                            minWidth: 40,
                            alignItems: "center",
                        },
                        "& .MuiListItemText-root": {
                            "& .MuiTypography-body1": {
                                color: theme.palette.primary.contrastText,
                            },
                        },
                    },
                },
            },
            "&.toggle": {
                width: 70,
                [theme.breakpoints.down("sm")]: {
                    width: 0,
                    opacity: 0,
                    visibility: "hidden",
                },
                "& $sidebarBrand": {
                    padding: "1rem",
                    "& img": {
                        width: "100%",
                    },
                },
                "& .MuiList-root": {
                    "& li": {
                        paddingLeft: "1rem",
                        "& a": {
                            padding: "1rem",
                            "& .MuiListItemText-root": {
                                display: "none",
                            },
                        },
                    },
                },
            },
        },
        sidebarBrand: {
            padding: "1rem 2rem",
        },
    };
});

export default useStyle;
