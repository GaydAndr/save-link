import React from 'react';
import ActionBtn from "../ActionBtn/ActionBtn";
// import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";
import {wordListAction} from "../../redux/wordList_slice";
import {uiAction} from "../../redux/ui_slice";
import ButtonGroup from "@mui/material/ButtonGroup";

const RefactorBtn = ({id}) => {
  const dispatch = useDispatch();


  const handleDeleteList  = () => {
    dispatch(wordListAction.removeWordList(id))
  };

  const handleEditList  = () => {
    dispatch(wordListAction.startEditingList(id))
    dispatch(uiAction.showWordListForm())
  };

  return (
    <ButtonGroup
      variant="contained"
      aria-label="outlined primary button group"
      sx={{backgroundColor: '#4f4f4f'}}
    >
      <ActionBtn
        variant={'outlined'}
        color={'warning'}
        // icoBtn={<BorderColorIcon/>}
        funcs={handleEditList }
        // variant={'contained'}
        text={'Додати слово'}
      />
      <ActionBtn
        variant={'outlined'}
        color={'error'}
        icoBtn={<DeleteIcon/>}
        funcs={handleDeleteList }
      />
    </ButtonGroup>
  );
};

export default RefactorBtn;