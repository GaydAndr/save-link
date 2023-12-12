import {Paper} from "@mui/material";

const InputPaper = ({children, hover}) => {
  // const evetn = hover ? '&:hover' : '&:focus-within'
  const sxHover = {
    height: 1,
    '&:hover': {
      transition: 'all 0.2s ease-in-out',
      boxShadow: '0px 15px 30px -7px rgba(0,0,0,0.75)',
      backgroundColor: '#fff',
    },
  }
  const sxFocus = {
    height: 1,
    backgroundColor: '#c6e0fa',
    '&:focus-within': {
      transition: 'all 0.2s ease-in-out',
      boxShadow: '0px 15px 30px -7px rgba(0,0,0,0.75)',
      backgroundColor: '#fff',
    },
  }
  return (
    <Paper
      elevation={3}
      sx={hover ? sxHover : sxFocus }
    >
      {children}
    </Paper>
  );
};

export default InputPaper;