import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import {createTheme, ThemeProvider, Tooltip} from "@mui/material";
import JSONDownloadBTN from "./JSONDownloadBTN";
import DocxDownloadBTN from "./DocxDownloadBTN";
import {useSelector} from "react-redux";
import {getListOfSprints} from "../../redux/sprint_slice";

const options = [
  {
    id: "DOCX",
    nameOp: 'Завантажити як DOCX файл',
  },
  {
    id: 'JSON',
    nameOp: 'Завантажити як JSON файл',
  },
];

export default function DownloadBtn() {
  const listOfSprints = useSelector(getListOfSprints)

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = () => {
    if (options[selectedIndex].id === "DOCX"){
      DocxDownloadBTN(listOfSprints)
    }
    if (options[selectedIndex].id === "JSON"){
      JSONDownloadBTN(listOfSprints)
    }
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <ThemeProvider
      theme={createTheme({
        components: {
          MuiListItemButton: {
            defaultProps: {
              disableTouchRipple: true,
            },
          },
        },
        palette: {
          mode: "dark",
          primary: {main: "rgba(158,45,204,0.74)"},
          background: {paper: "rgb(181,113,238)"},
        },
      })}
    >
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
      >
        <Button
          onClick={handleClick}>{options[selectedIndex].nameOp}</Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <Tooltip title="Формат завантаження" placement="top" disableInteractive>
          <ArrowDropDownIcon/>
          </Tooltip>
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({TransitionProps, placement}) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option.nameOp}
                      disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option.nameOp}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </ThemeProvider>
  );
}
