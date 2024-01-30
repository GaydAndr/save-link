import React from 'react';
import { Paper, Stack, Typography} from "@mui/material";
import RefactorBtn from "./RefactorBtn";

const LinkHeader = ({title, id, amount}) => {

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="space-between"
      width={'100%'}
      px={1}
    >
      <Typography>
        {title}
      </Typography>
      <Stack
        spacing={4}
        direction={'row'}
        alignItems={'center'}
      >
        <Paper
          elevation={3}
          sx={{
            backgroundColor: 'rgba(158,45,204,0.41)',
            padding:'6px 10px'
        }}
        >
          <Typography>
            {amount}
          </Typography>

        </Paper>
        <RefactorBtn id={id}/>
      </Stack>
    </Stack>
  );
};

export default LinkHeader;