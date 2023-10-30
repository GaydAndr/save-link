import React, {useContext, useState} from 'react';
import InputField from "../InputField/InputField";
import ActionBtn from "../ActionBtn/ActionBtn";
import {Box, Paper, Stack} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {SprintTitleContext} from "../../App";

const SprintTitle = () => {
  const {sprintTitleText, handleSprintTitle,handleVisible} = useContext(SprintTitleContext);
  const [disable, setDisable] = useState(true)
  const handleDisable=()=>{
    setDisable(!disable)
  }

  return (
    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} spacing={1}>
      <Paper elevation={2} sx={{margin: ' 10px 0', width: 1}}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Box flex={1}>
            <InputField
              value={sprintTitleText}
              placeholder='Назва спринта'
              disabled={disable}
              func={handleSprintTitle}
            />
          </Box>
          <Box>
            <ActionBtn
              variant={'contained'}
              color={'primary'}
              icoBtn={<BorderColorIcon/>}
              funcs={handleDisable}
            />
          </Box>
        </Stack>
      </Paper>
      <Paper>
        <ActionBtn
          variant={'contained'}
          color={'error'}
          icoBtn={<DeleteIcon/>}
          funcs={handleVisible}
        />
      </Paper>
    </Stack>
  );
};

export default SprintTitle;