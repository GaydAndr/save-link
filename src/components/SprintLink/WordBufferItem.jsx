import ActionBtn from "../ActionBtn/ActionBtn";
import {Box, IconButton, Snackbar, Stack, Tooltip, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";
import {wordListAction} from "../../redux/wordList_slice";
import InputPaper from "../SprintForm/InputPaper";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import {useState} from "react";
import {handleTranslateClick} from "../../utils/handleTranslateClick";

const PRIMARY_LANGUAGE = 'en';
const SECONDARY_LANGUAGE = 'uk';

const WordBufferItem = ({word}) => {
  const dispatch = useDispatch()

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage] = useState('');

  const handleDelete  = () => {
    dispatch(wordListAction.removeWord(word.id))
  }

  const handleEdit  = () => {
    dispatch((wordListAction.setEditingWord(word.id)))
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
          <Tooltip title="Перекласти">
            <IconButton size="small" onClick={() => handleTranslateClick(word.word, SECONDARY_LANGUAGE)}>
              <GTranslateIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ height: '24px', borderRight: '1px solid rgba(0, 0, 0, 0.12)' }} />
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', minWidth: 0, gap: 1 }}>
          <Typography sx={{ fontStyle: 'italic', mr: 'auto' }}>
            {word.translation}
          </Typography>
          <Tooltip title="Перекласти">
            <IconButton size="small" onClick={() => handleTranslateClick(word.translation, PRIMARY_LANGUAGE)}>
              <GTranslateIcon fontSize="small" />
            </IconButton>
          </Tooltip>
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
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
    </InputPaper>
  );
};

export default WordBufferItem;