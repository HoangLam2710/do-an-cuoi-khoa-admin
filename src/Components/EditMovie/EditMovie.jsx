import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    Typography,
    TextField,
    Button,
    FormControlLabel,
    Switch,
} from "@material-ui/core";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import { withStyles } from "@material-ui/core/styles";

import moment from "moment";
import { useFormik } from "formik";
import * as yup from "yup";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { toast } from "react-toastify";

import { actionTypes } from "../../Store/actions/types";
import { createAction } from "../../Store/actions";
import { editMovie, fetchMovies } from "../../Store/actions/movie";

import useStyle from "./style";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";

const validationSchema = yup.object().shape({
    tenPhim: yup.string().required("Không được bỏ trống!"),
    moTa: yup.string().required("Không được bỏ trống!"),
    trailer: yup.string().required("Không được bỏ trống!"),
});

const EditMovie = () => {
    const classes = useStyle();
    const dispatch = useDispatch();

    const movieEdit = useSelector((state) => {
        return state.movie.movieEdit;
    });

    const page = useSelector((state) => {
        return state.movie.page;
    });

    const formik = useFormik({
        initialValues: {
            maPhim: movieEdit.maPhim,
            tenPhim: movieEdit.tenPhim,
            trailer: movieEdit.trailer,
            moTa: movieEdit.moTa,
            ngayKhoiChieu: movieEdit.ngayKhoiChieu,
            sapChieu: movieEdit.sapChieu,
            dangChieu: movieEdit.dangChieu,
            hot: movieEdit.hot,
            danhGia: movieEdit.danhGia,
            hinhAnh: null,
            maNhom: "GP01",
        },
        onSubmit: (values) => {
            setAllTouched();
            if (!formik.isValid) return;

            let formData = new FormData(); //tạo dữ liệu formData
            for (let key in values) {
                if (key !== "hinhAnh") {
                    formData.append(key, values[key]);
                } else {
                    if (values.hinhAnh !== null) {
                        formData.append("hinhAnh", values.hinhAnh);
                    }
                }
            }

            dispatch(editMovie(formData, goToHome));
        },
        validationSchema,
        validateOnMount: true,
    });

    const [switchState, setSwitchState] = useState({
        sapChieu: formik.values.sapChieu,
        dangChieu: formik.values.dangChieu,
        hot: formik.values.hot,
    });

    const [selectedDate, setSelectedDate] = useState(
        new Date(`${movieEdit.ngayKhoiChieu}`)
    );

    const BaseSwitch = withStyles({
        switchBase: {
            color: "#fff",
            "&$checked": {
                color: "#fbbd61",
            },
            "&$checked + $track": {
                backgroundColor: "#fbbd61",
            },
        },
        checked: {},
        track: {},
    })(Switch);

    const handleSwitchChange = (event) => {
        setSwitchState({
            ...switchState,
            [event.target.name]: event.target.checked,
        });
        formik.setFieldValue(`${event.target.name}`, event.target.checked);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        formik.setFieldValue(
            "ngayKhoiChieu",
            moment(date).format("DD/MM/YYYY")
        );
    };

    const handleChangeFile = (event) => {
        let fileImage = event.target.files[0];
        formik.setFieldValue("hinhAnh", fileImage);
    };

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
        dispatch(createAction(actionTypes.SET_OPEN_PAGEMOVIE, false));
        dispatch(fetchMovies(page));
    }, [dispatch, page]);

    return (
        <>
            <Typography component="h2" variant="h6">
                Cập nhật thông tin phim
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <div className={classes.margin}>
                    <TextField
                        className={classes.textField}
                        label="Tên phim"
                        name="tenPhim"
                        value={formik.values.tenPhim}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        disabled
                    />
                    {formik.touched.tenPhim && (
                        <Typography color="error" variant={"subtitle2"}>
                            {formik.errors.tenPhim}
                        </Typography>
                    )}
                </div>
                <div className={classes.margin}>
                    <TextField
                        className={classes.textField}
                        label="Trailer"
                        name="trailer"
                        value={formik.values.trailer}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.trailer && (
                        <Typography color="error" variant={"subtitle2"}>
                            {formik.errors.trailer}
                        </Typography>
                    )}
                </div>
                <div className={classes.margin}>
                    <TextField
                        className={classes.textField}
                        label="Mô tả"
                        name="moTa"
                        value={formik.values.moTa}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.moTa && (
                        <Typography color="error" variant={"subtitle2"}>
                            {formik.errors.moTa}
                        </Typography>
                    )}
                </div>
                <div className={classes.margin}>
                    <TextField
                        className={classes.textField}
                        label="Đánh giá"
                        name="danhGia"
                        type="number"
                        value={formik.values.danhGia}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.danhGia && (
                        <Typography color="error" variant={"subtitle2"}>
                            {formik.errors.danhGia}
                        </Typography>
                    )}
                </div>
                <div className={classes.margin}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Ngày Chiếu"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                "aria-label": "change date",
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </div>

                <div className={classes.margin}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <div>
                            Sắp chiếu:{" "}
                            <FormControlLabel
                                control={
                                    <BaseSwitch
                                        checked={switchState.sapChieu}
                                        name="sapChieu"
                                        onChange={handleSwitchChange}
                                    />
                                }
                            />
                        </div>
                        <div>
                            Đang chiếu:{" "}
                            <FormControlLabel
                                control={
                                    <BaseSwitch
                                        checked={switchState.dangChieu}
                                        name="dangChieu"
                                        onChange={handleSwitchChange}
                                    />
                                }
                            />
                        </div>
                    </div>
                </div>

                <div className={classes.margin}>
                    Hot:{" "}
                    <FormControlLabel
                        control={
                            <BaseSwitch
                                checked={switchState.hot}
                                name="hot"
                                onChange={handleSwitchChange}
                            />
                        }
                    />
                </div>

                <div className={classes.margin}>
                    Hình ảnh: <input type="file" onChange={handleChangeFile} />
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

export default EditMovie;
