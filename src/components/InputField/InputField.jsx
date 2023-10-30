import React, {useEffect, useState} from 'react';
import {Button, InputBase, Stack} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const InputField = ({
                      placeholder,name, value, clear, disabled = false, func
                    }) => {

  return (
    <Stack
      direction={'row'}
      p={'0 10px'}
      sx={{
        backgroundColor: '#fff',
        height: 1,
        borderRadius: '5px'

      }}
      justifyContent={'space-between'}
    >
      <InputBase
        required
        fullWidth
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={(e) => func(e)}
      />
      {clear && <Button sx={{padding: 0, minWidth: '0'}} onClick={() => func(e.target.value='')}>
        <CloseIcon/>
      </Button>}
    </Stack>
  );
};

export default InputField;