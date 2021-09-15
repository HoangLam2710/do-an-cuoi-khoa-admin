import React from "react";
import { Box, Container } from "@material-ui/core";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { SupervisorAccount, LocalMovies } from "@material-ui/icons";
import useStyle from "./style";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import classNames from "classnames";

const Sidebar = () => {
    const classes = useStyle();

    const openSidebar = useSelector((state) => {
        return state.layout.open;
    });

    {
        let nav = document.querySelectorAll(".nav-sidebar");
        Array.from(nav).forEach((item) => {
            item.addEventListener("click", () => {
                let selected = document.getElementsByClassName("active");
                selected[0].className = selected[0].className.replace(
                    " active",
                    ""
                );
                item.className += " active";
            });
        });
    }

    return (
        <Container
            className={classNames(classes.sidebar, { toggle: openSidebar })}
        >
            <Box className={classes.sidebarBrand}>
                {openSidebar ? (
                    <img src="../favicon.png" alt="brand logo" />
                ) : (
                    <img src="../logo.svg" alt="brand logo" />
                )}
            </Box>
            <List component="nav" className="nav">
                <ListItem>
                    <NavLink to="/user">
                        <ListItemIcon>
                            <SupervisorAccount />
                        </ListItemIcon>
                        <ListItemText primary="Người dùng" />
                    </NavLink>
                </ListItem>
                <ListItem>
                    <NavLink to="/movie">
                        <ListItemIcon>
                            <LocalMovies />
                        </ListItemIcon>
                        <ListItemText primary="Phim" />
                    </NavLink>
                </ListItem>
            </List>
        </Container>
    );
};

export default Sidebar;
