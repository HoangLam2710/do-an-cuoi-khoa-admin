import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { createAction } from "../../Store/actions";
import { actionTypes } from "../../Store/actions/types";
import { getAdmin } from "../../Store/actions/admin";
import useStyle from "./style";

const Header = () => {
    const classes = useStyle();
    const dispatch = useDispatch();

    const admin = useSelector((state) => {
        return state.admin;
    });

    useEffect(() => {
        if (localStorage.getItem("taiKhoan")) {
            dispatch(getAdmin);
        }
    }, [dispatch]);

    const openSidebar = useCallback(() => {
        dispatch(createAction(actionTypes.SET_SIDEBAR));
    }, [dispatch]);

    const handleLogout = useCallback(() => {
        window.location.href = "/";
        localStorage.removeItem("taiKhoan");
        localStorage.removeItem("t");
        dispatch(createAction(actionTypes.REMOVE_ADMIN));
    }, [dispatch]);

    return (
        <div className={classes.root}>
            <AppBar position="static" color="inherit">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        onClick={openSidebar}
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Bảng điều khiển
                    </Typography>

                    <Box
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Typography className={classes.title2}>
                            Chào, {admin?.hoTen}
                        </Typography>
                        <Typography
                            style={{
                                margin: "0 10px",
                                color: "#9b9b9b",
                            }}
                        >
                            |
                        </Typography>
                        <Typography
                            className={classes.title2}
                            style={{
                                cursor: "pointer",
                            }}
                            onClick={handleLogout}
                        >
                            Đăng xuất
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
