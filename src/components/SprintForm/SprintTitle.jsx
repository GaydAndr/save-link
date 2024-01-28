import React, {useEffect, useRef, useState} from 'react';
import InputField from "../InputField/InputField";
import ActionBtn from "../ActionBtn/ActionBtn";
import {Box, Paper, Stack, Tooltip} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import {useDispatch, useSelector} from "react-redux";
import {uiAction} from "../../redux/ui_slice";
import {getSprintTitleText, sprintAction} from "../../redux/sprint_slice";
import MyModal from "../Modal/MyModal";

const SprintTitle = () => {
  const dispatch = useDispatch();
  const sprintTitleText = useSelector(getSprintTitleText)
  const [disableTitleField, setDisableTitleField] = useState(true)
  const [titleText, setTitleText] = useState(sprintTitleText)
  const [elvInputTitle, setElvInputTitle] = useState(3)
  const [typeAlert, setTypeAlert] = useState('')


  const titleInputRef = useRef(null)

  useEffect(() => {
    if (!disableTitleField) {
      titleInputRef.current.focus();
    }
  }, [disableTitleField]);

  const handleEditTitle = () => {
    setDisableTitleField(!disableTitleField)
    dispatch(sprintAction.setSprintTitle(titleText))
    setElvInputTitle(3)
  }

  const handleSprintTitle = (e) => {
    setTitleText(e.target.value)
  }

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
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        spacing={2}
      >
        <Paper
          elevation={elvInputTitle}
          sx={{margin: ' 10px 0', width: 1}}
          onFocus={() => {
            setElvInputTitle(20)
          }}
          onBlur={() => {
            setElvInputTitle(2)
          }}
        >
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Box flex={1}>
              <InputField
                value={titleText}
                placeholder='Назва спринта'
                disabled={disableTitleField}
                refValue={titleInputRef}
                func={handleSprintTitle}
              />
            </Box>
            <Tooltip title="Редагувати заголовок" placement="top" disableInteractive>
              <Box>
                {
                  disableTitleField &&
                  <ActionBtn
                    variant={'contained'}
                    color={'primary'}
                    icoBtn={<BorderColorIcon/>}
                    funcs={handleEditTitle}
                  />
                }
                {
                  !disableTitleField &&
                  <ActionBtn
                    variant={'contained'}
                    color={'success'}
                    icoBtn={<DownloadDoneIcon/>}
                    funcs={handleEditTitle}
                  />
                }
              </Box>
            </Tooltip>
          </Stack>
        </Paper>
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
      </Stack>
      {
        typeAlert &&
        <MyModal typeAlert={typeAlert} agreeFunc={closeSprintBuilder} handleClose={handleClose}/>
      }
    </>

  );
};

export default SprintTitle;