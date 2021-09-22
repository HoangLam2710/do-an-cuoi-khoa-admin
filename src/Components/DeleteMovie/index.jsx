import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Button } from "@material-ui/core";
import { actionTypes } from "../../Store/actions/types";
import { createAction } from "../../Store/actions";
import useStyle from "./style";
import { deleteMovieApi, fetchMovies } from "../../Store/actions/movie";

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
    dispatch(createAction(actionTypes.SET_OPEN, false));
  }, [dispatch]);

  const alertDelete = useCallback(() => {
    alert("Xoá thành công!!!");
    dispatch(createAction(actionTypes.SET_OPEN, false));
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
        <Button type="submit" variant="contained" onClick={cancleDelete}>
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
