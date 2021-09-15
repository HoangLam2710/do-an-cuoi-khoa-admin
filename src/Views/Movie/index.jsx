import React from "react";
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
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import useStyles from "./style";
import { Delete, Add, Edit } from "@material-ui/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../Store/actions/movie";
import { useCallback } from "react";
// import AddUser from "../../Components/AddUser";
// import EditUser from "../../Components/EditUser";
import { actionTypes } from "../../Store/actions/types";
import { createAction } from "../../Store/actions";

const Movie = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMovies(1));
    }, [dispatch]);

    const page = useSelector((state) => {
        return state.movie.page;
    });

    const movieList = useSelector((state) => {
        return state.movie.movieList;
    });

    // const open = useSelector((state) => {
    //     return state.movie.open;
    // });

    // const isEdit = useSelector((state) => {
    //     return state.movie.isEdit;
    // });

    // const handleOpen = useCallback(
    //     (edit, item = {}) => {
    //         // thực hiển việc mở popup
    //         dispatch(createAction(actionTypes.SET_OPEN_PAGEMOVIE, true));
    //         // thực hiện việc mở edit hay mở add
    //         dispatch(createAction(actionTypes.SET_EDIT_PAGEMOVIE, edit));
    //         // thực viện set thông tin user cần edit
    //         dispatch(createAction(actionTypes.SET_MOIVE_EDIT, item));
    //     },
    //     [dispatch]
    // );

    // const handleClose = useCallback(() => {
    //     // thực hiển việc tắt popup
    //     dispatch(createAction(actionTypes.SET_OPEN_PAGEMOVIE, false));
    // }, [dispatch]);

    const hanldChangePage = useCallback(
        (event, value) => {
            dispatch(createAction(actionTypes.SET_PAGE_MOVIE, value));
            dispatch(fetchMovies(value));
            window.scroll({ top: 0, behavior: "smooth" });
        },
        [dispatch]
    );

    // const alertDelete = useCallback(() => {
    //     alert("Xoá thành công!!!");
    //     dispatch(fetchUserList(page));
    // }, [dispatch, page]);

    // const deleteUser = useCallback(
    //     (user) => {
    //         dispatch(deleteUserApi(user, alertDelete));
    //     },
    //     [dispatch, alertDelete]
    // );

    return (
        <Container maxWidth="lg" className={classes.container}>
            <div className={classes.button}>
                <Button
                    variant="contained"
                    className={classes.buttonAdd}
                    startIcon={<Add />}
                    // onClick={() => handleOpen(false)}
                >
                    Add
                </Button>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    // open={open}
                    // onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    {/* <Fade in={open}> */}
                    <Fade>
                        <div className={classes.paper}>
                            {/* {isEdit ? <EditUser /> : <AddUser />} */}
                        </div>
                    </Fade>
                </Modal>
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Mã phim</TableCell>
                            <TableCell align="left" className="hiddenMobile">
                                Hình ảnh
                            </TableCell>
                            <TableCell>Tên phim</TableCell>
                            <TableCell className="hiddenMobile">
                                Mô tả
                            </TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {movieList &&
                            movieList.items.map((item) => {
                                return (
                                    <TableRow key={item.email}>
                                        <TableCell component="th" scope="row">
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
                                        <TableCell>{item.tenPhim}</TableCell>
                                        <TableCell className="hiddenMobile">
                                            {item.moTa.substring(0, 100) +
                                                " ..."}
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                className={classes.buttonEdit}
                                                // onClick={() =>
                                                //     handleOpen(true, item)
                                                // }
                                            >
                                                <Edit />
                                            </IconButton>
                                            <IconButton
                                                className={classes.buttonDelete}
                                                // onClick={() => deleteUser(item)}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                count={movieList?.totalPages}
                onChange={hanldChangePage}
                className={classes.pagination}
                defaultPage={page}
            />
        </Container>
    );
};

export default Movie;
