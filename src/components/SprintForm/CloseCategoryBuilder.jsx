import React, {useState} from 'react';
import {Paper, Tooltip} from "@mui/material";
import ActionBtn from "../ActionBtn/ActionBtn";
import DeleteIcon from "@mui/icons-material/Delete";
import MyModal from "../Modal/MyModal";
import {uiAction} from "../../redux/ui_slice";
import {getCurrentId, sprintAction} from "../../redux/sprint_slice";
import {useDispatch, useSelector} from "react-redux";


const CloseCategoryBuilder = () => {
  const dispatch = useDispatch();
  const editCategoryId = useSelector(getCurrentId)
  const [typeAlert, setTypeAlert] = useState('')

  const handleDelete = () => {
    dispatch(uiAction.closeSprintForm())
    dispatch(sprintAction.setSprintTitle(''))
    dispatch(sprintAction.clearSprintList())
    if(editCategoryId){
      dispatch((sprintAction.removeSprint(editCategoryId)))
      dispatch((sprintAction.removeCurrentId()))
    }
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
          agreeFunc={handleDelete}
          handleClose={handleClose}
        />
      }
    </>
  );
};

export default CloseCategoryBuilder;