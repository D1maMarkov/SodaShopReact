import React from "react";
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';


const Alert = ({open, handleClose, severity, text}) => {
    return(
        <Stack spacing={2}>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <MuiAlert variant="filled" onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {text}
                </MuiAlert>
            </Snackbar>
        </Stack>
    )
};

export default Alert;
