import React, {memo, useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
  Accordion, AccordionDetails, AccordionSummary, Box, ListItem
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { wordListAction} from "../../redux/wordList_slice";
import {getSearchQuery, uiAction} from "../../redux/ui_slice";
import {getModalType} from "../../redux/selectors/uiSelectors";
import { selectFilteredWordLists } from "../../redux/selectors/wordSelectors";
import LinkHeader from "./LinkHeader";
import TopBtnStack from "./TopBtnStack";
import MyModal from "../Modal/MyModal";
import WordListContent from "./WordListContent";
import SearchArea from "../SearchArea/SearchArea";

const WordListsDisplay = () => {
  const dispatch = useDispatch();
  const modalType = useSelector(getModalType);
  const filteredWordLists = useSelector(selectFilteredWordLists) ;
  const searchQuery = useSelector(getSearchQuery);

  const [expanded, setExpanded] = useState([]);

  useEffect(() => {
    if (filteredWordLists.length) {
      dispatch(uiAction.showWordLists())
    } else {
      dispatch(uiAction.hideWordLists())
    }
  },[filteredWordLists , dispatch]);

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      const allFilteredIds = filteredWordLists.map(list => list.id);
      setExpanded(allFilteredIds);
    } else {
      setExpanded([]);
    }
  }, [searchQuery, filteredWordLists]);

  const handleChange = useCallback((panelId) => (event, isExpanded) => {
    setExpanded(prev =>
      isExpanded
        ? [...prev, panelId]
        : prev.filter(id => id !== panelId)
    );
  },[]);

  const handleDeleteAll = useCallback(() => {
    dispatch(wordListAction.clearAllWordLists());
    dispatch(uiAction.hideWordLists());
    dispatch(uiAction.hideModal());
  },[dispatch]);

  const handleCloseModal = () => {
    dispatch(uiAction.hideModal());
  };

  return (
    <>
      <TopBtnStack/>
      <SearchArea setExpanded={setExpanded} filteredWordLists={filteredWordLists}/>
      <Box>
        {filteredWordLists?.map((wordList) => (
          <ListItem
            key={wordList.id}
            sx={{
              padding: 0,
              marginBottom:1
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
      </Box>
      {modalType === 'confirmClearAll' && (
        <MyModal
          typeAlert={'askAlert'}
          text="Ви впевнені, що хочете видалити ВСІ списки? Цю дію неможливо буде скасувати."
          agreeFunc={handleDeleteAll}
          handleClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default memo(WordListsDisplay);