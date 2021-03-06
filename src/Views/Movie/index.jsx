import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Container,
    Modal,
    Fade,
    Backdrop,
    IconButton,
    TextField,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { Delete, Add, Edit, Search, CalendarToday } from "@material-ui/icons";

import Layout from "../../HOC/Layout";

import { fetchMovies } from "../../Store/actions/movie";
import { actionTypes } from "../../Store/actions/types";
import { createAction } from "../../Store/actions";
import DeleteMovie from "../../Components/DeleteMovie";
import AddMovie from "../../Components/AddMovie";
import EditMovie from "../../Components/EditMovie/EditMovie";
import Createshowtimes from "../../Components/CreateShowtimes/CreateShowtimes";

import { useFormik } from "formik";
import { ToastContainer } from "react-toastify";

import useStyles from "./style";

const Movie = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    window.scroll({ top: 0, behavior: "smooth" });

    const formik = useFormik({
        initialValues: {
            tenPhim: "",
        },
        validateOnMount: true,
    });

    useEffect(() => {
        dispatch(createAction(actionTypes.SET_SIDEBAR_PAGE, true));
        if (formik.values.tenPhim === "") {
            dispatch(fetchMovies(1));
            dispatch(createAction(actionTypes.SET_PAGE_MOVIE, 1));
        }
    }, [dispatch, formik.values.tenPhim]);

    const open = useSelector((state) => {
        return state.movie.open;
    });

    const page = useSelector((state) => {
        return state.movie.page;
    });

    const movieList = useSelector((state) => {
        return state.movie.movieList;
    });

    const contentModal = useSelector((state) => {
        return state.movie.contentModal;
    });

    const handleOpen = useCallback(
        (contentModal, item = {}) => {
            // th???c hi???n vi???c m??? popup
            dispatch(createAction(actionTypes.SET_OPEN_PAGEMOVIE, true));
            // th???c hi???n vi???c m??? edit ho???c add ho???c delete
            dispatch(
                createAction(actionTypes.SET_EDIT_PAGEMOVIE, contentModal)
            );
            // th???c vi???n set th??ng tin user c???n edit ho???c delete
            dispatch(createAction(actionTypes.SET_MOVIE_EDIT, item));
        },
        [dispatch]
    );

    const handleClose = useCallback(() => {
        // th???c hi???n vi???c t???t popup
        dispatch(createAction(actionTypes.SET_OPEN_PAGEMOVIE, false));
    }, [dispatch]);

    const handleSearchMovie = useCallback(
        (e) => {
            e.preventDefault();
            dispatch(fetchMovies(1, formik.values.tenPhim));
        },
        [dispatch, formik.values.tenPhim]
    );

    const hanldChangePage = useCallback(
        (event, value) => {
            dispatch(createAction(actionTypes.SET_PAGE_MOVIE, value));
            formik.values.tenPhim === ""
                ? dispatch(fetchMovies(value))
                : dispatch(fetchMovies(value, formik.values.tenPhim));
            window.scroll({ top: 0, behavior: "smooth" });
        },
        [dispatch, formik.values]
    );

    return (
        <Layout>
            <Container maxWidth="lg" className={classes.container}>
                <div className={classes.wrapSearch}>
                    <form onSubmit={handleSearchMovie}>
                        <TextField
                            id="username"
                            name="tenPhim"
                            label="T??m ki???m phim"
                            type="search"
                            variant="outlined"
                            value={formik.values.tenPhim}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <Button type="submit" className={classes.buttonSearch}>
                            <Search />
                        </Button>
                    </form>

                    <Button
                        variant="contained"
                        className={classes.buttonAdd}
                        startIcon={<Add />}
                        onClick={() => handleOpen("add")}
                    >
                        Th??m phim
                    </Button>

                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                            <div className={classes.paper}>
                                {contentModal === "edit" ? (
                                    <EditMovie />
                                ) : contentModal === "add" ? (
                                    <AddMovie />
                                ) : contentModal === "createshowtimes" ? (
                                    <Createshowtimes />
                                ) : (
                                    <DeleteMovie />
                                )}
                            </div>
                        </Fade>
                    </Modal>
                </div>
                <TableContainer component={Paper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>M?? phim</TableCell>
                                <TableCell
                                    align="left"
                                    className="hiddenMobile"
                                >
                                    H??nh ???nh
                                </TableCell>
                                <TableCell>T??n phim</TableCell>
                                <TableCell className="hiddenMobile">
                                    M?? t???
                                </TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {movieList &&
                                movieList.items.map((item) => {
                                    return (
                                        <TableRow key={item.email}>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {item.maPhim}
                                            </TableCell>
                                            <TableCell
                                                align="left"
                                                className="hiddenMobile"
                                            >
                                                <img
                                                    src={item.hinhAnh}
                                                    alt={item.tenPhim}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {item.tenPhim}
                                            </TableCell>
                                            <TableCell className="hiddenMobile">
                                                {item.moTa.substring(0, 100) +
                                                    " ..."}
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    className={
                                                        classes.buttonEdit
                                                    }
                                                    onClick={() =>
                                                        handleOpen("edit", item)
                                                    }
                                                >
                                                    <Edit />
                                                </IconButton>
                                                <IconButton
                                                    className={
                                                        classes.buttonDelete
                                                    }
                                                    onClick={() =>
                                                        handleOpen(
                                                            "delete",
                                                            item
                                                        )
                                                    }
                                                >
                                                    <Delete />
                                                </IconButton>
                                                <IconButton
                                                    className={
                                                        classes.buttonDelete
                                                    }
                                                    onClick={() =>
                                                        handleOpen(
                                                            "createshowtimes",
                                                            item
                                                        )
                                                    }
                                                >
                                                    <CalendarToday />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                    {/* hi???n popup th??ng b??o */}
                    <ToastContainer />
                </TableContainer>
                <Pagination
                    count={movieList?.totalPages}
                    onChange={hanldChangePage}
                    className={classes.pagination}
                    page={page}
                    defaultPage={1}
                />
            </Container>
        </Layout>
    );
};

export default Movie;
