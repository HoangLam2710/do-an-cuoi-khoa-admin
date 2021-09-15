import { createAction } from "./index";
import { actionTypes } from "./types";
import { request } from "../../API/request";

export const fetchMovies = (currentPage) => (dispatch) => {
    request({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhimPhanTrang",
        method: "GET",
        params: {
            maNhom: "GP01",
            soTrang: currentPage,
            soPhanTuTrenTrang: 20,
        },
    })
        .then((res) => {
            dispatch(createAction(actionTypes.SET_MOVIELIST, res.data.content));
        })
        .catch((err) => {
            console.log(err);
        });
};
