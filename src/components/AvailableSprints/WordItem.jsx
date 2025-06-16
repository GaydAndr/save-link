import React, { useState } from 'react';
import { ListItem, Typography, IconButton, Box, Checkbox } from "@mui/material";
import GTranslateIcon from '@mui/icons-material/GTranslate';
import {useDispatch} from "react-redux";
import {wordListAction} from "../../redux/wordList_slice";
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';


const createTranslateUrl = (text, sl = 'en', tl = 'uk') => {
  const encodedText = encodeURIComponent(text);
  return `https://translate.google.com/?sl=${sl}&tl=${tl}&text=${encodedText}&op=translate`;
};

const WordItem = ({ word, listId }) => {
  const useDispatch = useDispatch();

  const isLearned = word.isLearned;
  const originalWord = word.word;
  const translatedWord = word.translation;

  const handleTranslateClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleToggleLearned = () => {
    dispatch(wordListAction.toggleWordLearnedStatus({
      listId: listId,
      wordId: word.id
    }));
  };

  // Стилі для "вивченого" слова
  const learnedStyles = {
    color: 'rgb(180, 180, 180)',
    textDecoration: 'line-through',
    opacity: 0.7,
  };

  return (
    <ListItem
      sx={{
        display: 'flex',
        alignItems: 'center',
        py: 0.5,
        px: 1,
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        gap: 1,
        transition: 'all 0.2s ease-in-out',
        ...(isLearned && learnedStyles),
      }}
    >
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', minWidth: 0, gap: 1 }}>
        <Checkbox
          checked={isLearned}
          onChange={handleToggleLearned}
          aria-label={`Mark ${originalWord} as learned`}
          sx={{ p: 0.5 }}
        />
        <Typography sx={{ fontWeight: 'medium', mr: 'auto' }}>
          {originalWord}
        </Typography>
        <IconButton size="small" onClick={() => handleTranslateClick(createTranslateUrl(originalWord))}>
          <GTranslateIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ height: '24px', borderRight: '1px solid rgba(0, 0, 0, 0.12)' }} />

      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', minWidth: 0, gap: 1 }}>
        <Typography sx={{ fontStyle: 'italic', mr: 'auto' }}>
          {translatedWord}
        </Typography>
        <IconButton size="small" onClick={() => handleTranslateClick(createTranslateUrl(translatedWord, 'uk', 'en'))}>
          <GTranslateIcon fontSize="small" />
        </IconButton>

        {/* Майбутній функціонал: показуємо кнопки тільки в режимі редагування */}
        {/*{isEditing && (*/}
        {/*  <>*/}
        {/*    <IconButton size="small" color="primary">*/}
        {/*      <EditIcon fontSize="small" />*/}
        {/*    </IconButton>*/}
        {/*    <IconButton size="small" color="error">*/}
        {/*      <DeleteIcon fontSize="small" />*/}
        {/*    </IconButton>*/}
        {/*  </>*/}
        {/*)}*/}
      </Box>
    </ListItem>
  );
};

export default WordItem;