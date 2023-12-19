import React from 'react';
import {Button, DialogActions, DialogTitle} from "@mui/material";

const AskAlert = ({handleClose, handleAgree}) => {
  return (
    <>
      <DialogTitle sx={{ m: 0, pt: 3, px:3 }} id="customized-dialog-title">
        Бажаєте видалити цей список?
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Ні</Button>
        <Button onClick={handleAgree}>Так</Button>
      </DialogActions>
    </>
  );
};

export default AskAlert;