import React from 'react';
import {Paper, Tooltip} from "@mui/material";
import ActionBtn from "../ActionBtn/ActionBtn";
import DeleteIcon from "@mui/icons-material/Delete";
import { uiAction} from "../../redux/ui_slice";
import {useDispatch} from "react-redux";


const CloseCategoryBuilder = () => {
  const dispatch = useDispatch();

  const openConfirmationModal = () => {
    dispatch(uiAction.showModal({ type: 'askAlert' }));
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
            funcs={openConfirmationModal}
          />
        </Paper>
      </Tooltip>
    </>
  );
};

export default CloseCategoryBuilder;