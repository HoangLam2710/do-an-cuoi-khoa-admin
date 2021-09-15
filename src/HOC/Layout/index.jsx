import React from "react";
import { useSelector } from "react-redux";
import { Box, Container } from "@material-ui/core";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import useStyle from "./style";
import classNames from "classnames";

const Layout = (props) => {
    const classes = useStyle();

    const openSidebar = useSelector((state) => {
        return state.layout.open;
    });

    return (
        <>
            <Container maxWidth="false" style={{ padding: 0 }}>
                <Sidebar />
                <Box
                    className={classNames(classes.mainContent, {
                        toggle: openSidebar,
                    })}
                >
                    <Header />
                    {props.children}
                </Box>
            </Container>
        </>
    );
};

export default Layout;
