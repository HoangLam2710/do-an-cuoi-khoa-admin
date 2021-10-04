import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => {
    return {
        mainContent: {
            marginLeft: 300,
            "&.toggle": {
                marginLeft: 100,
                [theme.breakpoints.down("sm")]: {
                    marginLeft: 0,
                },
            },
        },
    };
});

export default useStyle;
