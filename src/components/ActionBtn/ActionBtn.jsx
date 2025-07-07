import React, {memo, useCallback} from 'react';
import {Button, IconButton} from "@mui/material";

const ActionBtn = ({
                     variant= 'contained' || 'outlined' || 'text',
                     color="inherit" || "primary" || "secondary" || "success" || "error" || "info" || "warning",
                     text,
                     icoBtn,
                     fullWidth,
                     funcs,
                     disabled,
                     type = 'button'
                   }) => {
  const handleButtonClick =useCallback( (e) => {
    e.stopPropagation()
    funcs()
  },[funcs]);
  return (
    <>
      {!icoBtn && <Button
        fullWidth={fullWidth}
        variant={variant}
        color={color}
        onClick={handleButtonClick}
        disabled={disabled}
        type={type}
      >
        {text}
      </Button>}
      {icoBtn && <IconButton
        color={color}
        // aria-label="delete"
        onClick={handleButtonClick}
        disabled={disabled}
        type={type}
      >
        {icoBtn}
      </IconButton>}
    </>
  );
};

export default memo( ActionBtn);