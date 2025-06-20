import ActionBtn from "../ActionBtn/ActionBtn";
import {Box, IconButton, Stack, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";
import {wordListAction} from "../../redux/wordList_slice";
import InputPaper from "../SprintForm/InputPaper";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import GTranslateIcon from "@mui/icons-material/GTranslate";

/**
 * Створює URL для Google Translate з автоматичним визначенням мови джерела.
 * @param {string} text - Текст для перекладу.
 * @param {string} targetLang - Цільова мова (напр., 'en', 'uk', 'pl').
 * @returns {string} - Готовий URL.
 */
const createTranslateUrl = (text, targetLang) => {
  const encodedText = encodeURIComponent(text);
  return `https://translate.google.com/?sl=auto&tl=${targetLang}&text=${encodedText}&op=translate`;
};

const PRIMARY_LANGUAGE = 'en';
const SECONDARY_LANGUAGE = 'uk';

const WordBufferItem = ({word}) => {
  const dispatch = useDispatch()

  const handleDelete  = () => {
    dispatch(wordListAction.removeWord(word.id))
  }

  const handleEdit  = () => {
    dispatch((wordListAction.setEditingWord(word.id)))
  };

  const handleTranslateClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <InputPaper>
      <Stack
        direction={'row'}
        alignItems={'center'}
        sx={{
          width: 1,
          py: 0.5,
          px: 1,
          gap: 1,
        }}
      >
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', minWidth: 0, gap: 1 }}>
          <Typography variant={'h6'} flex={1} p={1}>
            {word.word}
          </Typography>
          <IconButton size="small" onClick={() => handleTranslateClick(createTranslateUrl(word.word, SECONDARY_LANGUAGE))}>
            <GTranslateIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box sx={{ height: '24px', borderRight: '1px solid rgba(0, 0, 0, 0.12)' }} />
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', minWidth: 0, gap: 1 }}>
          <Typography sx={{ fontStyle: 'italic', mr: 'auto' }}>
            {word.translation}
          </Typography>
          <IconButton size="small" onClick={() => handleTranslateClick(createTranslateUrl(word.translation, PRIMARY_LANGUAGE))}>
            <GTranslateIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box sx={{  pr: 2 }}>
          <ActionBtn
            variant={'contained'}
            color={'primary'}
            icoBtn={<BorderColorIcon/>}
            funcs={handleEdit}
            size="small"
          />
          <ActionBtn
            variant={'contained'}
            color={'error'}
            icoBtn={<DeleteIcon/>}
            funcs={handleDelete}
            size="small"
          />
        </Box>

      </Stack>
    </InputPaper>
  );
};

export default WordBufferItem;