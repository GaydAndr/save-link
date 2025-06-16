import React, {memo, useEffect} from 'react';
import {
  Accordion, AccordionDetails, AccordionSummary, Box,
  createTheme,
  List,
  ListItem,
  styled,
  ThemeProvider
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useDispatch, useSelector} from "react-redux";
import {getAllWordLists, wordListAction} from "../../redux/wordList_slice";
import WordItem from "./WordItem";
import LinkHeader from "./LinkHeader";
import TopBtnStack from "./TopBtnStack";
import {uiAction} from "../../redux/ui_slice";
import ActionBtn from "../ActionBtn/ActionBtn";

const FireNav = styled(List)({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

const addNewItem={
  title:"Add New Item",
  id: "00"
}

const WordListsDisplay = () => {
  const dispatch = useDispatch();
  const wordLists  = useSelector(getAllWordLists)
  const [expanded, setExpanded] = React.useState(false);

  useEffect(() => {
    if (wordLists .length) {
      dispatch(uiAction.showWordLists())
    } else {
      dispatch(uiAction.hideWordLists())
    }
  },[wordLists , dispatch]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleStartEditing  = (listId) => {
    dispatch(wordListAction.startEditingList(listId))
    dispatch(uiAction.showWordListForm())
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
          background: {paper: "rgb(83,58,83)"},
        },
      })}
    >
      <TopBtnStack/>
      <FireNav
        disablePadding
        sx={{
          width: '100%',
          overflow: 'auto',
          '& ul': {padding: 0},
        }}
      >
        {wordLists ?.map((wordList, i) => (

          <ListItem
            key={wordList.id}
            sx={{
              padding: 0
            }}
          >
            <Box sx={{
              width: '100%',
              position: 'relative',
            }}>
              <Accordion
                expanded={expanded === `panel${i}`}
                onChange={handleChange(`panel${i}`)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon/>}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <LinkHeader
                    title={wordList.listName}
                    id={wordList.id}
                    amount={wordList.words.length}
                  />
                </AccordionSummary>
                <AccordionDetails sx={{
                  padding: 0
                }}>
                  <List
                    disablePadding
                    sx={{
                      bgcolor: 'rgba(231,116,255,0.32)'
                    }}
                  >
                    <ListItem
                      disablePadding
                      key={"00"}
                      sx={{
                        py: 0,
                        bgcolor: 'rgb(255,255,255)',
                      }}
                    >
                      <ActionBtn
                        variant={'contained'}
                        color={'warning'}
                        text={'Додати слово'}
                        fullWidth
                        funcs={() => handleStartEditing (wordList.id)}
                      />
                    </ListItem>
                    {wordList.words.map((word) => (
                      // <ListItem
                      //   disablePadding
                      //   key={sprintLink.id}
                      //   sx={{
                      //     py: 0,
                      //     bgcolor: 'rgba(215,215,215,0.8)',
                      //   }}
                      // >
                        <WordItem item={word}/>
                      // </ListItem>
                    ))}
                  </List>
                </AccordionDetails>

              </Accordion>
            </Box>
          </ListItem>
        ))}
      </FireNav>
    </ThemeProvider>

  );
};

export default memo(WordListsDisplay);