import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
    Container,
    Typography,
    TextField,
    InputAdornment,
    Button,
} from "@material-ui/core";
import { AccountCircle, Lock } from "@material-ui/icons";
import { useFormik } from "formik";
import * as yup from "yup";
import { signIn } from "../../Store/actions/admin";
import useStyles from "./style";

const validationSchema = yup.object().shape({
    taiKhoan: yup.string().required("Không được bỏ trống!"),
    matKhau: yup.string().required("Không được bỏ trống!"),
});

const Home = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            taiKhoan: "",
            matKhau: "",
        },
        validateOnMount: true,
        validationSchema,
    });

    const setAllTouched = useCallback(() => {
        Object.keys(formik.values).forEach((key) => {
            formik.setFieldTouched(key);
        });
    }, [formik]);

    const goToUser = useCallback(() => {
        props.history.push("/user");
    }, [props.history]);

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            setAllTouched();
            if (!formik.isValid) return;
            dispatch(signIn(formik.values, goToUser));
        },
        [formik.isValid, formik.values, setAllTouched, dispatch, goToUser]
    );

    return (
        <>
            <Container maxWidth="lg" className={classes.container}>
                <Typography variant="h4" component="h1">
                    Trang quản trị Movie Star
                </Typography>
                <form style={{ width: 350 }} onSubmit={handleSubmit}>
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
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Đăng Nhập
                        </Button>
                    </div>
                </form>
            </Container>
        </>
    );
};

export default Home;
