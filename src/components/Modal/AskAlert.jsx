import React from 'react';
import {Button, DialogActions, DialogTitle} from "@mui/material";

const AskAlert = ({handleClose, handleAgree, text }) => {
  return (
    <>
      <DialogTitle sx={{ m: 0, pt: 3, px:3 }} id="customized-dialog-title">
        {text || "Ви впевнені?"}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Ні</Button>
        <Button onClick={handleAgree}>Так</Button>
      </DialogActions>
    </>
  );
};

export default AskAlert;