import {memo, useCallback} from 'react';
import {ListItem, Typography, IconButton, Box, Checkbox, Tooltip, Snackbar} from "@mui/material";
import GTranslateIcon from '@mui/icons-material/GTranslate';
import {useDispatch} from "react-redux";
import {wordListAction} from "../../redux/wordList_slice";
import {useState} from "react";
import {handleTranslateClick} from "../../utils/handleTranslateClick";

const PRIMARY_LANGUAGE = 'en';
const SECONDARY_LANGUAGE = 'uk';

const WordItem = ({ word, listId }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage] = useState('');

  const dispatch = useDispatch();

  const isLearned = word.isLearned;
  const originalWord = word.word;
  const translatedWord = word.translation;


  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleToggleLearned =useCallback( () => {
    dispatch(wordListAction.toggleWordLearnedStatus({
      listId: listId,
      wordId: word.id
    }));
  },[dispatch, listId, word]);

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
        <Tooltip title="Перекласти / Скопіювати">
          <IconButton size="small" onClick={() => handleTranslateClick(originalWord, SECONDARY_LANGUAGE)}>
            <GTranslateIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ height: '24px', borderRight: '1px solid rgba(0, 0, 0, 0.12)' }} />

      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', minWidth: 0, gap: 1 }}>
        <Typography sx={{ fontStyle: 'italic', mr: 'auto' }}>
          {translatedWord}
        </Typography>
        <Tooltip title="Перекласти / Скопіювати">
          <IconButton size="small" onClick={() => handleTranslateClick(translatedWord, PRIMARY_LANGUAGE)}>
            <GTranslateIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </ListItem>
  );
};

export default memo(WordItem);