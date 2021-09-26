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
  TextField,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import useStyles from "./style";
import { Delete, Add, Edit, Search } from "@material-ui/icons";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../Store/actions/movie";
import { useCallback } from "react";
import { actionTypes } from "../../Store/actions/types";
import { createAction } from "../../Store/actions";
import DeleteMovie from "../../Components/DeleteMovie";
import AddMovie from "../../Components/AddMovie";
import EditMovie from "../../Components/EditMovie/EditMovie";
import Createshowtimes from "../../Components/CreateShowtimes/CreateShowtimes";
import { useFormik } from "formik";

const Movie = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      tenPhim: "",
    },
    validateOnMount: true,
  });

  useEffect(() => {
    if (formik.values.tenPhim === "") {
      dispatch(fetchMovies(1));
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
    return state.user.contentModal;
  });

  const handleOpen = useCallback(
    (contentModal, item = {}) => {
      // thực hiển việc mở popup
      dispatch(createAction(actionTypes.SET_OPEN, true));
      // thực hiện việc mở edit hoặc add hoặc delete
      dispatch(createAction(actionTypes.SET_EDIT, contentModal));
      // thực viện set thông tin user cần edit hoạc delete
      dispatch(createAction(actionTypes.SET_MOIVE_EDIT, item));
    },
    [dispatch]
  );

  const handleClose = useCallback(() => {
    // thực hiển việc tắt popup
    dispatch(createAction(actionTypes.SET_OPEN, false));
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
      dispatch(createAction(actionTypes.SET_PAGE, value));
      formik.values.tenPhim === ""
        ? dispatch(fetchMovies(value))
        : dispatch(fetchMovies(value, formik.values.tenPhim));
      window.scroll({ top: 0, behavior: "smooth" });
    },
    [dispatch, formik.values]
  );

  return (
    <Container maxWidth="lg" className={classes.container}>
      <div className={classes.wrapSearch}>
        <form onSubmit={handleSearchMovie}>
          <TextField
            id="username"
            name="tenPhim"
            label="Tìm kiếm phim"
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
          Thêm phim
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
              <TableCell>Mã phim</TableCell>
              <TableCell align="left" className="hiddenMobile">
                Hình ảnh
              </TableCell>
              <TableCell>Tên phim</TableCell>
              <TableCell className="hiddenMobile">Mô tả</TableCell>
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
                    <TableCell align="left" className="hiddenMobile">
                      <img src={item.hinhAnh} alt={item.tenPhim} />
                    </TableCell>
                    <TableCell>{item.tenPhim}</TableCell>
                    <TableCell className="hiddenMobile">
                      {item.moTa.substring(0, 100) + " ..."}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        className={classes.buttonEdit}
                        onClick={() => handleOpen("edit", item)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        className={classes.buttonDelete}
                        // onClick={() => deleteUser(item)}
                        onClick={() => handleOpen("delete", item)}
                      >
                        <Delete />
                      </IconButton>
                      <IconButton
                        className={classes.buttonDelete}
                        // onClick={() => deleteUser(item)}
                        onClick={() => handleOpen("createshowtimes", item)}
                      >
                        <CalendarTodayIcon />
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
