import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import {
    Typography,
    TextField,
    Button,
    Switch,
    FormControlLabel,
} from "@material-ui/core";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import { withStyles } from "@material-ui/core/styles";

import { useFormik } from "formik";
import * as yup from "yup";
import moment from "moment";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { toast } from "react-toastify";

import { createAction } from "../../Store/actions";
import { actionTypes } from "../../Store/actions/types";
import { addMovie } from "../../Store/actions/movie";

import useStyle from "./style";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";

const validationSchema = yup.object().shape({
    tenPhim: yup.string().required("Không được bỏ trống!"),
    moTa: yup.string().required("Không được bỏ trống!"),
    trailer: yup.string().required("Không được bỏ trống!"),
});

const AddMovie = () => {
    const classes = useStyle();
    const dispatch = useDispatch();

    const [switchState, setSwitchState] = useState({
        sapChieu: false,
        dangChieu: false,
        hot: false,
    });

    const [selectedDate, setSelectedDate] = useState(new Date());

    const formik = useFormik({
        initialValues: {
            tenPhim: "",
            trailer: "",
            moTa: "",
            ngayKhoiChieu: "18/08/2021",
            sapChieu: false,
            dangChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: {},
            maNhom: "GP01",
        },
        onSubmit: (values) => {
            setAllTouched();
            if (!formik.isValid) return;
            let formData = new FormData();

            for (let key in values) {
                formData.append(key, values[key]);
            }
            dispatch(addMovie(formData, goToHome));
        },

        validationSchema,
        validateOnMount: true,
    });

    const setAllTouched = useCallback(() => {
        Object.keys(formik.values).forEach((key) =>
            formik.setFieldTouched(key)
        );
    }, [formik]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        formik.setFieldValue(
            "ngayKhoiChieu",
            moment(date).format("DD/MM/YYYY")
        );
    };

    const handleChangeFile = (event) => {
        const file = event.target.files[0];

        formik.setFieldValue("hinhAnh", file);
    };

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
        dispatch(createAction(actionTypes.SET_OPEN_PAGEMOVIE, false));
        dispatch(createAction(actionTypes.SET_PAGE_MOVIE, 1));
        window.location.href = "/movie";
    }, [dispatch]);

    const handleChangeDanhGia = (event) => {
        let rate = parseInt(event.target.value);
        formik.setFieldValue("danhGia", rate);
    };

    return (
        <>
            <Typography component="h2" variant="h6">
                Thêm phim
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <div className={classes.margin}>
                    <TextField
                        className={classes.textField}
                        label="Tên phim"
                        name="tenPhim"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
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
                        onChange={handleChangeDanhGia}
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
                        Thêm
                    </Button>
                </div>
            </form>
        </>
    );
};

export default AddMovie;
