import React from 'react';
import {Stack} from "@mui/material";
import DownloadBtn from "../DownloadBTN/DownloadBTN";
import ActionBtn from "../ActionBtn/ActionBtn";
import {useDispatch} from "react-redux";
import {sprintAction} from "../../redux/sprint_slice";

const BtnStack = () => {
  const dispatch = useDispatch();

  const handlaDelete  = () => {
    dispatch(sprintAction.clearListOfSprint())
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
        funcs={handlaDelete}
      />
    </Stack>
  );
};

export default BtnStack;