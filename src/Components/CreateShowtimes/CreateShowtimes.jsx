import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@material-ui/core";

import { useFormik } from "formik";
import moment from "moment";
import { toast } from "react-toastify";

import { actionTypes } from "../../Store/actions/types";
import { createAction } from "../../Store/actions";
import {
    createShowtimes,
    fetchCinemaCluster,
    fetchCinemaSystem,
} from "../../Store/actions/cinema";

import useStyle from "./style";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";

const Createshowtimes = () => {
    const classes = useStyle();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCinemaSystem());
    }, [dispatch]);

    const cinemaSys = useSelector((state) => {
        return state.cinema.cinemaSystem;
    });

    const [selectedCinemaSys, setSelectedCinemaSys] = useState("");

    useEffect(() => {
        dispatch(fetchCinemaCluster(selectedCinemaSys));
    }, [selectedCinemaSys, dispatch]);

    const cinemaCluster = useSelector((state) => {
        return state.cinema.cinemaCluster;
    });

    const handleSelectCinemaSys = (event) => {
        setSelectedCinemaSys(event.target.value);
    };

    const handleSelectCinemaCluster = (event) => {
        formik.setFieldValue("maRap", event.target.value);
    };

    const handleDateChange = (event) => {
        let dateTime = moment(event.target.value).format("DD/MM/YYYY hh:mm:ss");
        formik.setFieldValue("ngayChieuGioChieu", dateTime);
    };

    const movieEdit = useSelector((state) => {
        return state.movie.movieEdit;
    });

    const formik = useFormik({
        initialValues: {
            maPhim: movieEdit.maPhim,
            ngayChieuGioChieu: "",
            maRap: "",
            giaVe: 0,
        },
        onSubmit: (values) => {
            dispatch(createShowtimes(values, goToHome));
        },
    });

    const goToHome = useCallback(() => {
        toast.success("Tạo lịch chiếu thành công!!!", {
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
    }, [dispatch]);

    return (
        <>
            <Typography component="h2" variant="h6">
                Tạo lịch chiếu
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <div className={classes.margin}>
                    <FormControl className={classes.formControl}>
                        <InputLabel shrink>Hệ thống rạp</InputLabel>
                        <Select displayEmpty onChange={handleSelectCinemaSys}>
                            {cinemaSys?.map((item, index) => (
                                <MenuItem key={index} value={item.maHeThongRap}>
                                    {item.tenHeThongRap}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className={classes.margin}>
                    <FormControl className={classes.formControl}>
                        <InputLabel shrink>Cụm rạp</InputLabel>
                        <Select
                            displayEmpty
                            onChange={handleSelectCinemaCluster}
                        >
                            {cinemaCluster?.map((item, index) => (
                                <MenuItem key={index} value={item.maCumRap}>
                                    {item.tenCumRap}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className={classes.margin}>
                    <TextField
                        id="datetime-local"
                        label="Ngày chiếu/giờ chiếu"
                        type="datetime-local"
                        defaultValue="2021-10-04T10:30"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleDateChange}
                    />
                </div>
                <div className={classes.margin}>
                    <TextField
                        className={classes.textField}
                        label="Giá vé"
                        name="giaVe"
                        type="number"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>

                <div className={classes.margin}>
                    <Button type="submit" variant="contained" color="primary">
                        Tạo lịch chiếu
                    </Button>
                </div>
            </form>
        </>
    );
};

export default Createshowtimes;
