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
        toast.success("T???o l???ch chi???u th??nh c??ng!!!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        // th??m th??nh c??ng th?? t???t popup
        dispatch(createAction(actionTypes.SET_OPEN_PAGEMOVIE, false));
    }, [dispatch]);

    return (
        <>
            <Typography component="h2" variant="h6">
                T???o l???ch chi???u
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <div className={classes.margin}>
                    <FormControl className={classes.formControl}>
                        <InputLabel shrink>H??? th???ng r???p</InputLabel>
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
                        <InputLabel shrink>C???m r???p</InputLabel>
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
                        label="Ng??y chi???u/gi??? chi???u"
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
                        label="Gi?? v??"
                        name="giaVe"
                        type="number"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>

                <div className={classes.margin}>
                    <Button type="submit" variant="contained" color="primary">
                        T???o l???ch chi???u
                    </Button>
                </div>
            </form>
        </>
    );
};

export default Createshowtimes;
