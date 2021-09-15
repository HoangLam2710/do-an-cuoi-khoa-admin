import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Button } from "@material-ui/core";
import { fetchUserList, deleteUserApi } from "../../Store/actions/user";
import { actionTypes } from "../../Store/actions/types";
import { createAction } from "../../Store/actions";
import useStyle from "./style";

const DeleteUser = () => {
    const classes = useStyle();
    const dispatch = useDispatch();

    const userEdit = useSelector((state) => {
        return state.user.userEdit;
    });

    const page = useSelector((state) => {
        return state.user.page;
    });

    const cancleDelete = useCallback(() => {
        dispatch(createAction(actionTypes.SET_OPEN, false));
    }, [dispatch]);

    const alertDelete = useCallback(() => {
        alert("Xoá thành công!!!");
        dispatch(createAction(actionTypes.SET_OPEN, false));
        dispatch(fetchUserList(page));
    }, [dispatch, page]);

    const deleteUser = useCallback(() => {
        dispatch(deleteUserApi(userEdit.taiKhoan, alertDelete));
    }, [dispatch, alertDelete, userEdit.taiKhoan]);

    return (
        <>
            <Typography component="h2" variant="body1">
                Bạn có chắc chắn muốn xoá tài khoản {userEdit.taiKhoan}?
            </Typography>

            <div className={classes.margin}>
                <Button
                    type="submit"
                    variant="contained"
                    onClick={cancleDelete}
                >
                    Không
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    className={classes.error}
                    onClick={deleteUser}
                >
                    Xoá
                </Button>
            </div>
        </>
    );
};

export default DeleteUser;
