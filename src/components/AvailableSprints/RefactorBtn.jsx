import React from 'react';
import {Paper, Stack} from "@mui/material";
import ActionBtn from "../ActionBtn/ActionBtn";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";
import {sprintAction} from "../../redux/sprint_slice";
import {uiAction} from "../../redux/ui_slice";

const RefactorBtn = ({id}) => {
  const dispatch = useDispatch();


  const deleteCategory = () => {
    console.log('delete')
    dispatch(sprintAction.removeSprint(id))
  };

  const editCategory = () =>{
    console.log('edit')
    dispatch(sprintAction.editSprint(id))
    dispatch(uiAction.toggleSprintForm())
  };

  return (
    <Paper
      sx={{backgroundColor: '#4f4f4f',
    }}
      id={'RefactorBtn'}
    >
      <Stack
        direction="row"
        spacing={2}
        px={1}
        width={1}
        sx={{cursor:'default'}}
      >
        <ActionBtn
          variant={'outlined'}
          color={'warning'}
          icoBtn={<BorderColorIcon/>}
          funcs={editCategory}

        />
        <ActionBtn
          variant={'outlined'}
          color={'error'}
          icoBtn={<DeleteIcon/>}
          funcs={deleteCategory}
        />
      </Stack>
    </Paper>

  );
};

export default RefactorBtn;