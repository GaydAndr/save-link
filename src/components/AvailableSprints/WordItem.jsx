import {ListItem, Typography, IconButton, Box, Checkbox, Tooltip, Snackbar} from "@mui/material";
import GTranslateIcon from '@mui/icons-material/GTranslate';
import {useDispatch} from "react-redux";
import {wordListAction} from "../../redux/wordList_slice";
import {useState} from "react";

const createTranslateUrl = (text, targetLang) => {
  const encodedText = encodeURIComponent(text);
  return `https://translate.google.com/?sl=auto&tl=${targetLang}&text=${encodedText}&op=translate`;
};
const PRIMARY_LANGUAGE = 'en';
const SECONDARY_LANGUAGE = 'uk';

const isMobile = () => {
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

  return mobileRegex.test(navigator.userAgent);
};

const WordItem = ({ word, listId }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const dispatch = useDispatch();

  const isLearned = word.isLearned;
  const originalWord = word.word;
  const translatedWord = word.translation;

  const handleTranslateClick = (text, targetLang) => {
      if (isMobile()) {
        const mobileUrl = `googleTranslate://translate?sl=auto&tl=${targetLang}&phrase=${encodeURIComponent(text)}`;
        const webUrl = createTranslateUrl(text, targetLang);
        const fallbackTimeout = setTimeout(() => {
          window.open(webUrl, '_blank', 'noopener,noreferrer');
        }, 1200);
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'hidden') clearTimeout(fallbackTimeout);
        }, { once: true });
        window.location.href = mobileUrl;
      } else {
        window.open(createTranslateUrl(text, targetLang), '_blank', 'noopener,noreferrer');
      }

    // if (isMobile()) {
    //
    //   const mobileUrl = `googleTranslate://translate?sl=auto&tl=${targetLang}&phrase=${encodeURIComponent(text)}`;
    //   const webUrl = createTranslateUrl(text, targetLang);
    //   const fallbackTimeout = setTimeout(() => {
    //     window.open(webUrl, '_blank', 'noopener,noreferrer');
    //   }, 1200);
    //
    //   const handleVisibilityChange = () => {
    //     if (document.visibilityState === 'hidden') {
    //       clearTimeout(fallbackTimeout);
    //     }
    //   };
    //
    //   document.addEventListener('visibilitychange', handleVisibilityChange, { once: true });
    //
    //   window.location.href = mobileUrl;
    // } else {
    //   const webUrl = createTranslateUrl(text, targetLang);
    //   window.open(webUrl, '_blank', 'noopener,noreferrer');
    // }
    //   navigator.clipboard.writeText(text).then(() => {
    //     setSnackbarMessage(`'${text}' скопійовано!`);
    //     setSnackbarOpen(true);
    //   }).catch(err => {
    //     console.error('Помилка копіювання: ', err);
    //     setSnackbarMessage('Не вдалося скопіювати');
    //     setSnackbarOpen(true);
    //   });
    // } else {
    //   const url = createTranslateUrl(text, targetLang);
    //   window.open(url, '_blank', 'noopener,noreferrer');
    // }
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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

export default WordItem;