import React from 'react';
import {Stack} from "@mui/material";
import DownloadBtn from "../DownloadBTN/DownloadBTN";
import ActionBtn from "../ActionBtn/ActionBtn";
import {useDispatch} from "react-redux";
import {uiAction} from "../../redux/ui_slice";

const TopBtnStack = () => {
  const dispatch= useDispatch();

  const handleOpenConfirmModal   = () => {
    dispatch(uiAction.showModal({ type: 'confirmClearAll' }));
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={0}
      mb={2}
    >
      <DownloadBtn/>
      <ActionBtn
        text={"Очистити все"}
        color={'error'}
        variant={'contained'}
        funcs={handleOpenConfirmModal}
      />
    </Stack>
  );
};

export default TopBtnStack;