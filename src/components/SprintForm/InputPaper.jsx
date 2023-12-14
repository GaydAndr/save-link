import {Paper} from "@mui/material";

const InputPaper = ({children}) => {

  return (
    <Paper
      elevation={3}
      sx={{
        height: 1,
        backgroundColor: '#c6e0fa',
        transition: 'all 0.2s ease-in-out',
        '&:focus-within': {
          boxShadow: '0px 15px 30px -7px rgba(0,0,0,0.75)',
          backgroundColor: '#fff',
        },
        '&:hover': {
          transition: 'all 0.2s ease-in-out',
          boxShadow: '0px 10px 20px -7px rgba(0,0,0,0.75)',
        },
      }}
    >
      {children}
    </Paper>
  );
};

export default InputPaper;