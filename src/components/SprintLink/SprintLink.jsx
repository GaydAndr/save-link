import React, {useContext} from 'react';
import ActionBtn from "../ActionBtn/ActionBtn";
import {Paper, Stack, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {SprintContext} from "../SprintBuild/SprintBuild";

const SprintLink = ({title, type, handelDelete, id}) => {
  const ss=()=>{
    handelDelete(id)
  }

  return (
    <Paper sx={{p: 1, bgcolor: '#D9D9D9'}} >
      <Stack direction={'row'} alignItems={'center'} spacing={1}>
        <Typography
          component={'h5'}
          variant={'h6'}
          flex={1}
          bgcolor={'#BE77D7'}
          borderRadius={1}
          p={1}
        >
          {title}
        </Typography>
        <Typography
          component={'h6'}
          variant={'body1'}
          bgcolor={'#E2339C'}
          borderRadius={1}
          p={1}
        >
          {type}
        </Typography>
        <ActionBtn
          variant={'contained'}
          color={'error'}
          icoBtn={<DeleteIcon/>}
          funcs={ss}
        />
      </Stack>
    </Paper>
  );
};

export default SprintLink;