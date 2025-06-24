import React, {memo, useEffect, useState} from 'react';
import {
  Accordion, AccordionDetails, AccordionSummary, Box,
  createTheme,
  List,
  ListItem, Stack,
  styled,
  ThemeProvider,
  Button
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useDispatch, useSelector} from "react-redux";
import { wordListAction} from "../../redux/wordList_slice";
import LinkHeader from "./LinkHeader";
import TopBtnStack from "./TopBtnStack";
import {uiAction} from "../../redux/ui_slice";
import MyModal from "../Modal/MyModal";
import {getModalType} from "../../redux/selectors/uiSelectors";
import { selectFilteredWordLists } from "../../redux/selectors/wordSelectors";
import SearchField from "../common/SearchField";
import WordListContent from "./WordListContent";

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

const WordListsDisplay = () => {
  const dispatch = useDispatch();
  const modalType = useSelector(getModalType);
  const filteredWordLists = useSelector(selectFilteredWordLists);

  const [expanded, setExpanded] = useState([]);

  useEffect(() => {
    if (filteredWordLists.length) {
      dispatch(uiAction.showWordLists())
    } else {
      dispatch(uiAction.hideWordLists())
    }
  },[filteredWordLists , dispatch]);

  const handleChange = (panelId) => (event, isExpanded) => {
    setExpanded(prev =>
      isExpanded
        ? [...prev, panelId]
        : prev.filter(id => id !== panelId)
    );
  };

  const handleExpandAll = () => {
    setExpanded(filteredWordLists.map(list => list.id));
  };
  const handleCollapseAll = () => {
    setExpanded([]);
  };

  const handleDeleteAll = () => {
    dispatch(wordListAction.clearAllWordLists());
    dispatch(uiAction.hideWordLists());
    dispatch(uiAction.hideModal());
  };

  const handleCloseModal = () => {
    dispatch(uiAction.hideModal());
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
        <Box sx={{ mb: 2, p: 1, bgcolor: 'background.paper', borderRadius: 1 }}>
          <SearchField />
          <Stack direction="row" spacing={1}>
            <Button onClick={handleExpandAll} size="small">Розгорнути все</Button>
            <Button onClick={handleCollapseAll} size="small">Згорнути все</Button>
          </Stack>
        </Box>
      <FireNav
        disablePadding
        sx={{
          width: '100%',
          overflow: 'auto',
          '& ul': {padding: 0},
        }}
      >
        {filteredWordLists?.map((wordList, i) => (
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
                expanded={expanded.includes(wordList.id)}
                onChange={handleChange(wordList.id)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon/>}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <LinkHeader
                    title={wordList.listName}
                    id={wordList.id}
                    amount={`${wordList.words.length}`}
                  />
                </AccordionSummary>
                <AccordionDetails sx={{
                  padding: 0
                }}>
                  <WordListContent
                    listId={wordList.id}
                  />
                </AccordionDetails>

              </Accordion>
            </Box>
          </ListItem>
        ))}
      </FireNav>
      {modalType === 'confirmClearAll' && (
        <MyModal
          typeAlert={'askAlert'}
          text="Ви впевнені, що хочете видалити ВСІ списки? Цю дію неможливо буде скасувати."
          agreeFunc={handleDeleteAll}
          handleClose={handleCloseModal}
        />
      )}
    </ThemeProvider>

  );
};

export default memo(WordListsDisplay);