import React from 'react';
import {Typography} from "@mui/material";

const Title = () => {
  return (
    <>
      <Typography
        component={'h1'}
        variant={'h2'}
        sx={{
          textAlign: 'center'
        }}
      >
        React practical
      </Typography>
    </>
  );
};

export default Title;