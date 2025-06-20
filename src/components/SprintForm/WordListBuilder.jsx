import ListNameEditor from "./ListNameEditor";
import AddWordPairForm from "./AddWordPairForm ";
import ActionBtn from "../ActionBtn/ActionBtn";
import WordBufferItem from "../SprintLink/WordBufferItem";
import {Box, Paper, Stack, Tooltip} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {
  getCurrentWords,
  getCurrentListName,
  getEditingListId,
  wordListAction
} from "../../redux/wordList_slice";
import {getModalType, uiAction} from "../../redux/ui_slice";
import MyModal from "../Modal/MyModal";
import CloseCategoryBuilder from "./CloseCategoryBuilder";

const WordListBuilder = () => {
  const dispatch = useDispatch();

  const listName = useSelector(getCurrentListName)
  const currentWords  = useSelector(getCurrentWords)
  const editingListId  = useSelector(getEditingListId)
  const modalType = useSelector(getModalType);

  const handleSaveList  = () => {

    if (!listName) {
      dispatch(uiAction.showModal({ type: 'infoAlert' }));
      return
    }

    if (editingListId ) {
      dispatch(wordListAction.saveEditedList())
    }else {
      const newListPayload  = {
        listName: listName,
        words: currentWords,
      }
      dispatch(wordListAction.addWordList(newListPayload ))
      dispatch(uiAction.showWordLists())
    }

    handleCloseAndClear ()
  }
  const handleCloseModal  = () => {
    dispatch(uiAction.hideModal())
  };

  const cancelEdit = () => {
    handleCloseAndClear ()
  };

  const handleCloseAndClear  = () => {
    dispatch(wordListAction.clearCurrentList())
    dispatch(uiAction.hideWordListForm())
  };

  const handleDeleteListAndClose = () => {
    if (editingListId) {
      dispatch(wordListAction.removeWordList(editingListId));
    }
    handleCloseAndClear();
    dispatch(uiAction.hideModal());
  };

  return (
    <Paper
      elevation={5}
      sx={{
        padding: 1,
        backgroundColor: '#9C9C9C'
      }}
    >
      <Stack spacing={2}>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          spacing={2}
        >
          <ListNameEditor/>
          <CloseCategoryBuilder/>
        </Stack>

        <AddWordPairForm/>
        <Stack
          spacing={2}
          direction={"row"}
          justifyContent="space-between"
        >
          <Tooltip
            title={!currentWords.length ?'Додайте хоча б одне слово':'Зберегти список'}
            disableInteractive
            placement="top"
          >
            <Box width={'100%'}>
              <ActionBtn
                variant={'contained'}
                color={"success"}
                text={'Зберегти'}
                funcs={handleSaveList }
                disabled={!currentWords.length}
                fullWidth
              />
            </Box>
          </Tooltip>
          {editingListId  && <ActionBtn
            variant={'contained'}
            color={"warning"}
            text={'Відмінити'}
            funcs={cancelEdit}
            fullWidth
          />}
        </Stack>
        {currentWords[0] &&
          currentWords.map(wordItem  => {
            return <WordBufferItem
              key={wordItem.id}
              word={wordItem}
            />
          })
        }

      </Stack>
      {modalType   &&
        <MyModal
          typeAlert={modalType}
          agreeFunc={modalType === 'askAlert' ? handleDeleteListAndClose : handleSaveList}
          handleClose={handleCloseModal }
          text={"Ну нє"}
        />
      }
    </Paper>
  );
};

export default WordListBuilder;