import React, { memo, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Container,
    Modal,
    Fade,
    Backdrop,
    IconButton,
    TextField,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { Delete, Add, Edit, Search } from "@material-ui/icons";
import { fetchUserList } from "../../Store/actions/user";
import AddUser from "../../Components/AddUser";
import EditUser from "../../Components/EditUser";
import DeleteUser from "../../Components/DeleteUser";
import { actionTypes } from "../../Store/actions/types";
import { createAction } from "../../Store/actions";
import { useFormik } from "formik";
import useStyles from "./style";

const User = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            tuKhoa: "",
        },
        validateOnMount: true,
    });

    const open = useSelector((state) => {
        return state.user.open;
    });

    // modal sẽ mở edit, add hoặc delete
    const contentModal = useSelector((state) => {
        return state.user.contentModal;
    });

    const page = useSelector((state) => {
        return state.user.page;
    });

    const userList = useSelector((state) => {
        return state.user.userList;
    });

    useEffect(() => {
        if (formik.values.tuKhoa === "") {
            dispatch(fetchUserList(1));
        }
    }, [dispatch, formik.values]);

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            dispatch(fetchUserList(1, formik.values.tuKhoa));
        },
        [dispatch, formik.values]
    );

    const hanldChangePage = useCallback(
        (event, value) => {
            dispatch(createAction(actionTypes.SET_PAGE, value));
            formik.values.tuKhoa === ""
                ? dispatch(fetchUserList(value))
                : dispatch(fetchUserList(value, formik.values.tuKhoa));
            window.scroll({ top: 0, behavior: "smooth" });
        },
        [dispatch, formik.values]
    );

    const handleOpen = useCallback(
        (contentModal, item = {}) => {
            // thực hiển việc mở popup
            dispatch(createAction(actionTypes.SET_OPEN, true));
            // thực hiện việc mở edit hoặc add hoặc delete
            dispatch(createAction(actionTypes.SET_EDIT, contentModal));
            // thực viện set thông tin user cần edit hoạc delete
            dispatch(createAction(actionTypes.SET_USER_EDIT, item));
        },
        [dispatch]
    );

    const handleClose = useCallback(() => {
        // thực hiển việc tắt popup
        dispatch(createAction(actionTypes.SET_OPEN, false));
    }, [dispatch]);

    return (
        <Container maxWidth="lg" className={classes.container}>
            <div className={classes.wrapSearch}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        id="username"
                        name="tuKhoa"
                        label="Tìm kiếm người dùng"
                        type="search"
                        variant="outlined"
                        value={formik.values.tuKhoa}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <Button type="submit" className={classes.buttonSearch}>
                        <Search />
                    </Button>
                </form>

                <Button
                    variant="contained"
                    className={classes.buttonAdd}
                    startIcon={<Add />}
                    onClick={() => handleOpen("add")}
                >
                    Thêm tài khoản
                </Button>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.paper}>
                            {contentModal === "edit" ? (
                                <EditUser />
                            ) : contentModal === "add" ? (
                                <AddUser />
                            ) : (
                                <DeleteUser />
                            )}
                        </div>
                    </Fade>
                </Modal>
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Họ tên</TableCell>
                            <TableCell align="right">Tài khoản</TableCell>
                            <TableCell align="right" className="hiddenMobile">
                                Email
                            </TableCell>
                            <TableCell align="right" className="hiddenMobile">
                                Số điện thoại
                            </TableCell>
                            <TableCell align="right" className="hiddenMobile">
                                Loại người dùng
                            </TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userList &&
                            userList.items.map((item) => {
                                return (
                                    <TableRow key={item.email}>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            align="left"
                                        >
                                            {item.hoTen}
                                        </TableCell>
                                        <TableCell align="right">
                                            {item.taiKhoan}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            className="hiddenMobile"
                                        >
                                            {item.email}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            className="hiddenMobile"
                                        >
                                            {item.soDt}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            className="hiddenMobile"
                                        >
                                            {item.maLoaiNguoiDung ===
                                            "KhachHang"
                                                ? "Khách Hàng"
                                                : "Quản Trị"}
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                className={classes.buttonEdit}
                                                onClick={() =>
                                                    handleOpen("edit", item)
                                                }
                                            >
                                                <Edit />
                                            </IconButton>
                                            <IconButton
                                                className={classes.buttonDelete}
                                                onClick={() =>
                                                    handleOpen("delete", item)
                                                }
                                            >
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                count={userList?.totalPages}
                onChange={hanldChangePage}
                className={classes.pagination}
                defaultPage={page}
            />
        </Container>
    );
};

export default memo(User);
