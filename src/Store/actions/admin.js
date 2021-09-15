import { createAction } from "./index";
import { actionTypes } from "./types";
import { request } from "../../API/request";

export const signIn = (account, cb) => (dispatch) => {
    request({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
        method: "POST",
        data: account,
    })
        .then((res) => {
            if (res.data.content.maLoaiNguoiDung === "QuanTri") {
                dispatch(createAction(actionTypes.SET_ADMIN, res.data.content));
                localStorage.setItem("t", res.data.content.accessToken);
                localStorage.setItem("taiKhoan", res.data.content.taiKhoan);
                cb();
            } else {
                alert("Tài khoản không được quyền truy cập!!!");
            }
        })
        .catch((err) => {
            alert("Tài khoản hoặc mật khẩu nhập sai!!!");
            console.log(err);
        });
};

export const getAdmin = (dispatch) => {
    request({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
        method: "POST",
    })
        .then((res) => {
            dispatch(createAction(actionTypes.SET_ADMIN, res.data.content));
        })
        .catch((err) => {
            console.log(err);
        });
};
