import {
  Dialog,
  Slide
} from "@mui/material";
import React, {forwardRef} from "react";
import AskAlert from "./AskAlert";
import InfoAlert from "./InfoAlert";
import {useSelector} from "react-redux";
import {getModalType} from "../../redux/selectors/uiSelectors";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const MyModal = ({typeAlert, agreeFunc, handleClose, text }) => {
  const modalType = useSelector(getModalType);

  const handleAgree = () => {
    agreeFunc()
  };

  return (
    <>
      <Dialog
        open={!!modalType}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        {typeAlert === 'infoAlert' && <InfoAlert handleClose={handleClose} text={text}/>}
        {typeAlert === 'askAlert' && <AskAlert handleClose={handleClose} handleAgree={handleAgree} text={text}/>}
      </Dialog>
    </>
  );
};

export default MyModal;
