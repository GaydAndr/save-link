import React from 'react';
import {Stack, Typography} from "@mui/material";
import RefactorBtn from "./RefactorBtn";

const LinkHeader = ({title ,id}) => {

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
      <RefactorBtn id={id}/>
    </Stack>
  );
};

export default LinkHeader;