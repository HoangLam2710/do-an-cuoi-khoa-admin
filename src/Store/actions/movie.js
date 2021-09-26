import { createAction } from "./index";
import { actionTypes } from "./types";
import { request } from "../../API/request";

export const fetchMovies = (currentPage, tenPhim) => (dispatch) => {
  request({
    url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhimPhanTrang",
    method: "GET",
    params: {
      maNhom: "GP01",
      soTrang: currentPage,
      soPhanTuTrenTrang: 20,
      tenPhim,
    },
  })
    .then((res) => {
      dispatch(createAction(actionTypes.SET_MOVIELIST, res.data.content));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteMovieApi = (movieId, callback) => () => {
  request({
    url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim",
    method: "DELETE",
    params: {
      MaPhim: movieId,
    },
  })
    .then((res) => {
      callback();
    })
    .catch((err) => {
      alert(err.response.data.content);
      console.log(err);
    });
};

export const addMovie = (movieData, callback) => () => {
  request({
    url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh",
    method: "POST",
    data: movieData,
  })
    .then((res) => {
      callback();
    })
    .catch((err) => {
      alert(err.response.data.content);
      console.log(err.response.data);
    });
};

export const editMovie = (dataUpdate, callback) => () => {
  request({
    url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhimUpload",
    method: "POST",
    data: dataUpdate,
  })
    .then((res) => {
      callback();
    })
    .catch((err) => {
      alert(err.response.data.content);
      console.log(err);
    });
};
