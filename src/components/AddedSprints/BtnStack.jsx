import React from 'react';
import {Stack} from "@mui/material";
import DownloadBtn from "../DownloadBTN/DownloadBTN";
import ActionBtn from "../ActionBtn/ActionBtn";
import {useDispatch} from "react-redux";
import {sprintAction} from "../../redux/sprint_slice";
import {uiAction} from "../../redux/ui_slice";

const BtnStack = () => {
  const dispatch = useDispatch();

  const handleDelete  = () => {
    dispatch(sprintAction.clearListOfSprint())
    dispatch(uiAction.closeSprintLists())
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
        text={"Очистити список"}
        color={'error'}
        variant={'contained'}
        funcs={handleDelete}
      />
    </Stack>
  );
};

export default BtnStack;