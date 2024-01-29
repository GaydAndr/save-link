import {
  Dialog,
  Slide
} from "@mui/material";
import React, {forwardRef} from "react";
import AskAlert from "./AskAlert";
import InfoAlert from "./InfoAlert";
import {useSelector} from "react-redux";
import {getModalState} from "../../redux/ui_slice";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const MyModal = ({typeAlert, agreeFunc, handleClose}) => {
  const modalState = useSelector(getModalState)

  const handleAgree = () => {
    agreeFunc()
  };

  return (
    <>
      <Dialog
        open={modalState}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        {typeAlert === 'infoAlert' && <InfoAlert handleClose={handleClose}/>}
        {typeAlert === 'askAlert' && <AskAlert handleClose={handleClose} handleAgree={handleAgree}/>}
      </Dialog>
    </>
  );
};

export default MyModal;
