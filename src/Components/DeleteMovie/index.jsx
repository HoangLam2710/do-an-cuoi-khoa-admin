import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Typography, Button } from "@material-ui/core";

import { actionTypes } from "../../Store/actions/types";
import { createAction } from "../../Store/actions";
import { deleteMovieApi, fetchMovies } from "../../Store/actions/movie";

import { toast } from "react-toastify";

import useStyle from "./style";

const DeleteMovie = () => {
    const classes = useStyle();
    const dispatch = useDispatch();

    const movieEdit = useSelector((state) => {
        return state.movie.movieEdit;
    });

    const page = useSelector((state) => {
        return state.movie.page;
    });

    const cancleDelete = useCallback(() => {
        dispatch(createAction(actionTypes.SET_OPEN_PAGEMOVIE, false));
    }, [dispatch]);

    const alertDelete = useCallback(() => {
        toast.success("Xoá thành công!!!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        dispatch(createAction(actionTypes.SET_OPEN_PAGEMOVIE, false));
        dispatch(fetchMovies(page));
    }, [dispatch, page]);

    const deleteMovie = useCallback(() => {
        dispatch(deleteMovieApi(movieEdit.maPhim, alertDelete));
    }, [dispatch, alertDelete, movieEdit.maPhim]);

    return (
        <>
            <Typography component="h2" variant="body1">
                Bạn có chắc chắn muốn xoá phim {movieEdit.tenPhim}?
            </Typography>

            <div className={classes.margin}>
                <Button
                    type="submit"
                    variant="contained"
                    onClick={cancleDelete}
                >
                    Không
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    className={classes.error}
                    onClick={deleteMovie}
                >
                    Xoá
                </Button>
            </div>
        </>
    );
};

export default DeleteMovie;
