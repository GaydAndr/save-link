import React from 'react';
import {Button, DialogActions, DialogTitle, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const InfoAlert = ({handleClose}) => {
  return (
    <>
      <DialogTitle sx={{ m: 0, pt: 5, px:5 }} id="customized-dialog-title">
        Введіть назву спринта
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 6,
          top: 6,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Окей
        </Button>
      </DialogActions>
    </>
  );
};

export default InfoAlert;