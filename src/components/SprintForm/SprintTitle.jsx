import React, {useEffect, useRef, useState} from 'react';
import InputField from "../InputField/InputField";
import ActionBtn from "../ActionBtn/ActionBtn";
import {Box, Paper, Stack, Tooltip} from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import {useDispatch, useSelector} from "react-redux";
import {getSprintTitleText, getTitleIsSave, sprintAction} from "../../redux/sprint_slice";

const SprintTitle = () => {
  const dispatch = useDispatch();
  const titleIsSave = useSelector(getTitleIsSave)
  const sprintTitleText = useSelector(getSprintTitleText)
  const [titleText, setTitleText] = useState(sprintTitleText)
  const [elvInputTitle, setElvInputTitle] = useState(3)


  const titleInputRef = useRef(null)

  useEffect(() => {
    if (!titleIsSave) {
      titleInputRef.current.focus();
    }
  }, [titleIsSave]);
  useEffect(() => {
    setTitleText(sprintTitleText)
  }, [sprintTitleText]);

  const titleBlur = () => {
    dispatch(sprintAction.setSprintTitle(titleText))
  };

  const handleEditTitle = () => {
    dispatch(sprintAction.toggleTitleIsSave())
    dispatch(sprintAction.setSprintTitle(titleText))
    setElvInputTitle(3)
  }

  const handleSprintTitle = (e) => {
    setTitleText(e.target.value)
  }

  return (
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
      <Stack direction={"row"} justifyContent={'space-between'} alignItems={'center'}>
        <Box flex={1}>
          <InputField
            value={titleText}
            placeholder='Назва спринта'
            disabled={titleIsSave}
            refValue={titleInputRef}
            func={handleSprintTitle}
            blurFunc={titleBlur}
          />
        </Box>
        <Tooltip
          title="Редагувати заголовок"
          placement="top"
          disableInteractive>
          <Box>
            {
              titleIsSave &&
              <ActionBtn
                variant={'contained'}
                color={'primary'}
                icoBtn={<BorderColorIcon/>}
                funcs={handleEditTitle}
              />
            }
            {
              !titleIsSave &&
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
  );
};

export default SprintTitle;