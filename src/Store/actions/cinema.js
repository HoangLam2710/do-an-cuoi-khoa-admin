import { createAction } from "./index";
import { actionTypes } from "./types";
import { request } from "../../API/request";
import { toast } from "react-toastify";

export const fetchCinemaSystem = () => (dispatch) => {
    request({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap",
        method: "GET",
    })
        .then((res) => {
            dispatch(
                createAction(actionTypes.SET_CINEMA_SYSTEM, res.data.content)
            );
        })
        .catch((err) => {
            console.log(err);
        });
};

export const fetchCinemaCluster = (cinemaSysId) => (dispatch) => {
    request({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong",
        method: "GET",
        params: {
            maHeThongRap: cinemaSysId,
        },
    })
        .then((res) => {
            dispatch(
                createAction(actionTypes.SET_CINEMA_CLUSTER, res.data.content)
            );
        })
        .catch((err) => {
            console.log(err);
        });
};

export const createShowtimes = (data, callback) => () => {
    request({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/TaoLichChieu",
        method: "POST",
        data: data,
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
