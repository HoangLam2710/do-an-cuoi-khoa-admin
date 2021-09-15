import { createAction } from "./index";
import { actionTypes } from "./types";
import { request } from "../../API/request";

export const fetchUserList = (currentPage, tuKhoa) => (dispatch) => {
    request({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang",
        method: "GET",
        params: {
            MaNhom: "GP01",
            tuKhoa,
            soTrang: currentPage,
            soPhanTuTrenTrang: 20,
        },
    })
        .then((res) =>
            dispatch(createAction(actionTypes.SET_USERLIST, res.data.content))
        )
        .catch((err) => console.log(err));
};

export const addUser = (user, callback) => () => {
    request({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung",
        method: "POST",
        data: user,
    })
        .then((res) => {
            callback();
        })
        .catch((err) => {
            alert(err.response.data.content);
            console.log(err);
        });
};

export const editUser = (user, callback) => () => {
    request({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        method: "POST",
        data: user,
    })
        .then((res) => {
            callback();
        })
        .catch((err) => {
            alert(err.response.data.content);
            console.log(err);
        });
};

export const deleteUserApi = (user, callback) => () => {
    request({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung",
        method: "DELETE",
        params: {
            TaiKhoan: user,
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
