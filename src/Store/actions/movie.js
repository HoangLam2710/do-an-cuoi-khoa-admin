import { createAction } from "./index";
import { actionTypes } from "./types";
import { request } from "../../API/request";
import { toast } from "react-toastify";

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
            toast.warn(err.response.data.content, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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
            toast.warn(err.response.data.content, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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
            toast.warn(err.response.data.content, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
};
