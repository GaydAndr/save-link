import React, {useEffect, useRef, useState} from 'react';
import InputField from "../InputField/InputField";
import ActionBtn from "../ActionBtn/ActionBtn";
import {Box, Paper, Stack, Tooltip} from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import {useDispatch, useSelector} from "react-redux";
import {wordListAction} from "../../redux/wordList_slice";
import {getCurrentListName, getIsListNameSaved} from "../../redux/selectors/wordSelectors";

const ListNameEditor = () => {
  const dispatch = useDispatch();

  const isNameSaved  = useSelector(getIsListNameSaved)
  const listName  = useSelector(getCurrentListName)
  const [elvInputTitle, setElvInputTitle] = useState(3)

  const titleInputRef = useRef(null)

  useEffect(() => { 
    if (!isNameSaved ) {
      titleInputRef.current.focus();
    }
  }, [isNameSaved ]);

  const handleEditClick = () => {
    dispatch(wordListAction.setIsListNameSaved(false));
  };

  const handleSaveClick = () => {
    dispatch(wordListAction.setIsListNameSaved(true));
  };
  const handleNameChange  = (e) => {
    dispatch(wordListAction.setCurrentListName(e.target.value));
  }

  return (
    <Paper
      elevation={elvInputTitle}
      sx={{margin: ' 10px 0', width: 1}}
      onFocus={() => setElvInputTitle(20)}
      onBlur={() => setElvInputTitle(2)}
    >
      <Stack direction={"row"} justifyContent={'space-between'} alignItems={'center'}>
        <Box flex={1}>
          <InputField
            value={listName}
            placeholder='Назва списку'
            disabled={isNameSaved}
            inputRef={titleInputRef}
            onChange={handleNameChange}
            name="listName"
          />
        </Box>
        <Tooltip title="Редагувати заголовок" placement="top" disableInteractive>
          <Box>
            {isNameSaved ? (
              <ActionBtn
                variant={'contained'}
                color={'primary'}
                icoBtn={<BorderColorIcon/>}
                funcs={handleEditClick}
              />
            ) : (
              <ActionBtn
                variant={'contained'}
                color={'success'}
                icoBtn={<DownloadDoneIcon/>}
                funcs={handleSaveClick}
              />
            )}
          </Box>
        </Tooltip>
      </Stack>
    </Paper>
  );
};

export default ListNameEditor;