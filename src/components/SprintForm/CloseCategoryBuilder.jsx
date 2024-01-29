import React, {useState} from 'react';
import {Paper, Tooltip} from "@mui/material";
import ActionBtn from "../ActionBtn/ActionBtn";
import DeleteIcon from "@mui/icons-material/Delete";
import MyModal from "../Modal/MyModal";
import {uiAction} from "../../redux/ui_slice";
import {sprintAction} from "../../redux/sprint_slice";
import {useDispatch} from "react-redux";


const CloseCategoryBuilder = () => {
  const dispatch = useDispatch();
  const [typeAlert, setTypeAlert] = useState('')

  const closeSprintBuilder = () => {
    dispatch(uiAction.closeSprintForm())
    dispatch(sprintAction.setSprintTitle(''))
    dispatch(sprintAction.clearSprintList())
  }

  const handleClose = () => {
    dispatch(uiAction.closeModal())
    setTypeAlert('')
  };

  const openInfoModal = () => {
    setTypeAlert('askAlert')
    dispatch(uiAction.openModal())
  };
  return (
    <>
      <Tooltip
        title="Видалити спринт"
        disableInteractive
        placement="top"
      >
        <Paper>
          <ActionBtn
            variant={'contained'}
            color={'error'}
            icoBtn={<DeleteIcon/>}
            funcs={openInfoModal}
          />
        </Paper>
      </Tooltip>
      {
        typeAlert &&
        <MyModal
          typeAlert={typeAlert}
          agreeFunc={closeSprintBuilder}
          handleClose={handleClose}
        />
      }
    </>
  );
};

export default CloseCategoryBuilder;