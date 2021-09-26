import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => {
  return {
    textField: {
      width: 400,
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
    switchBase: {
      color: theme.palette.primary.main,
      "&$checked": {
        color: theme.palette.primary.main,
      },
      "&$checked + $track": {
        backgroundColor: theme.palette.primary.main,
      },
    },
    margin: {
      margin: "15px 0",
    },
    formControl: {
      minWidth: 400,
      [theme.breakpoints.down("xs")]: {
        minWidth: "100%",
      },
    },
  };
});

export default useStyle;
