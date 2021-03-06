import React, { useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    Typography,
    TextField,
    InputAdornment,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@material-ui/core";
import {
    AccountCircle,
    Lock,
    Email,
    PhoneIphone,
    Person,
} from "@material-ui/icons";

import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

import { editUser, fetchUserList } from "../../Store/actions/user";
import { actionTypes } from "../../Store/actions/types";
import { createAction } from "../../Store/actions";

import useStyle from "./style";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";

const validationSchema = yup.object().shape({
    matKhau: yup.string().required("Không được bỏ trống!"),
    hoTen: yup.string().required("Không được bỏ trống!"),
    email: yup
        .string()
        .email("Sai định dạng email!")
        .required("Không được bỏ trống!"),
    soDt: yup
        .string()
        .required("Không được bỏ trống!")
        .matches(/^[0-9]{10}$/g, "Sai định dạng số diện thoại!"),
});

const EditUser = () => {
    const classes = useStyle();
    const dispatch = useDispatch();

    const userEdit = useSelector((state) => {
        return state.user.userEdit;
    });

    const page = useSelector((state) => {
        return state.user.page;
    });

    const formik = useFormik({
        initialValues: {
            taiKhoan: userEdit.taiKhoan,
            matKhau: userEdit.matKhau,
            email: userEdit.email,
            soDt: userEdit.soDt,
            maNhom: "GP01",
            maLoaiNguoiDung: userEdit.maLoaiNguoiDung,
            hoTen: userEdit.hoTen,
        },
        validationSchema,
        validateOnMount: true,
    });

    const setAllTouched = useCallback(() => {
        Object.keys(formik.values).forEach((key) =>
            formik.setFieldTouched(key)
        );
    }, [formik]);

    const goToHome = useCallback(() => {
        toast.success("Cập nhật thành công!!!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        // thêm thành công thì tắt popup
        dispatch(createAction(actionTypes.SET_OPEN, false));
        dispatch(fetchUserList(page));
    }, [dispatch, page]);

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            setAllTouched();
            if (!formik.isValid) return;
            dispatch(editUser(formik.values, goToHome));
        },
        [dispatch, formik.isValid, formik.values, setAllTouched, goToHome]
    );

    return (
        <>
            <Typography component="h2" variant="h6">
                Cập nhật thông tin
            </Typography>
            <form onSubmit={handleSubmit}>
                <div className={classes.margin}>
                    <TextField
                        className={classes.textField}
                        id="username"
                        label="Tài khoản"
                        name="taiKhoan"
                        value={formik.values.taiKhoan}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                        disabled
                    />
                </div>
                <div className={classes.margin}>
                    <TextField
                        className={classes.textField}
                        id="password"
                        type="password"
                        label="Mật khẩu"
                        name="matKhau"
                        value={formik.values.matKhau}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock />
                                </InputAdornment>
                            ),
                        }}
                    />
                    {formik.touched.matKhau && (
                        <Typography color="error" variant={"subtitle2"}>
                            {formik.errors.matKhau}
                        </Typography>
                    )}
                </div>
                <div className={classes.margin}>
                    <TextField
                        className={classes.textField}
                        id="fullname"
                        label="Họ tên"
                        name="hoTen"
                        value={formik.values.hoTen}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Person />
                                </InputAdornment>
                            ),
                        }}
                    />
                    {formik.touched.hoTen && (
                        <Typography color="error" variant={"subtitle2"}>
                            {formik.errors.hoTen}
                        </Typography>
                    )}
                </div>
                <div className={classes.margin}>
                    <TextField
                        className={classes.textField}
                        id="email"
                        type="email"
                        label="Email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Email />
                                </InputAdornment>
                            ),
                        }}
                    />
                    {formik.touched.email && (
                        <Typography color="error" variant={"subtitle2"}>
                            {formik.errors.email}
                        </Typography>
                    )}
                </div>
                <div className={classes.margin}>
                    <TextField
                        className={classes.textField}
                        id="phone"
                        label="Số điện thoại"
                        name="soDt"
                        value={formik.values.soDt}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PhoneIphone />
                                </InputAdornment>
                            ),
                        }}
                    />
                    {formik.touched.soDt && (
                        <Typography color="error" variant={"subtitle2"}>
                            {formik.errors.soDt}
                        </Typography>
                    )}
                </div>
                <div className={classes.margin}>
                    <FormControl className={classes.formControl}>
                        <InputLabel shrink id="select-loaikhachhang-label">
                            Loại khách hàng
                        </InputLabel>
                        <Select
                            labelId="select-loaikhachhang-label"
                            id="select-loaikhachhang"
                            displayEmpty
                            name="maLoaiNguoiDung"
                            value={formik.values.maLoaiNguoiDung}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value="KhachHang">Khách Hàng</MenuItem>
                            <MenuItem value="QuanTri">Quản Trị</MenuItem>
                        </Select>
                    </FormControl>
                    {formik.touched.maLoaiNguoiDung && (
                        <Typography color="error" variant={"subtitle2"}>
                            {formik.errors.maLoaiNguoiDung}
                        </Typography>
                    )}
                </div>
                <div className={classes.margin}>
                    <Button type="submit" variant="contained" color="primary">
                        Cập nhật
                    </Button>
                </div>
            </form>
        </>
    );
};

export default memo(EditUser);
