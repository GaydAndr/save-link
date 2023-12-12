import React from 'react';
import {Button, IconButton} from "@mui/material";

const ActionBtn = ({variant, color, text, icoBtn, fullWidth, funcs, disabled, type='button' }) => {
  const handleButtonClick = () => {
    if (Array.isArray(funcs)) {
      Promise.all(funcs?.map(func => func())).catch(error => {
        // Обробка помилок, якщо є
        console.error('An error occurred:', error);
      });
      return
    }
    funcs()
  };
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
        aria-label="delete"
        onClick={handleButtonClick}
        disabled={disabled}
        type={type}
      >
        {icoBtn}
      </IconButton>}
    </>
  );
};

export default ActionBtn;