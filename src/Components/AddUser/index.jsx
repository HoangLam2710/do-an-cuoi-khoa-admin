import React, { useCallback, memo } from "react";
import { useDispatch } from "react-redux";

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

import { addUser } from "../../Store/actions/user";
import { actionTypes } from "../../Store/actions/types";
import { createAction } from "../../Store/actions";

import useStyle from "./style";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";

const validationSchema = yup.object().shape({
    taiKhoan: yup.string().required("Không được bỏ trống!"),
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

const AddUser = () => {
    const classes = useStyle();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            taiKhoan: "",
            matKhau: "",
            email: "",
            soDt: "",
            maNhom: "GP01",
            maLoaiNguoiDung: "",
            hoTen: "",
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
        toast.success("Thêm thành công!!!", {
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
        dispatch(createAction(actionTypes.SET_PAGE, 1));
        window.location.href = "/user";
    }, [dispatch]);

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            setAllTouched();
            if (!formik.isValid) return;
            dispatch(addUser(formik.values, goToHome));
        },
        [dispatch, formik.isValid, formik.values, setAllTouched, goToHome]
    );

    return (
        <>
            <Typography component="h2" variant="h6">
                Thêm tài khoản
            </Typography>
            <form onSubmit={handleSubmit}>
                <div className={classes.margin}>
                    <TextField
                        className={classes.textField}
                        id="username"
                        label="Tài khoản"
                        name="taiKhoan"
                        value={formik.values.taiKhoan}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                    />
                    {formik.touched.taiKhoan && (
                        <Typography color="error" variant={"subtitle2"}>
                            {formik.errors.taiKhoan}
                        </Typography>
                    )}
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
                        Thêm
                    </Button>
                </div>
            </form>
        </>
    );
};

export default memo(AddUser);
