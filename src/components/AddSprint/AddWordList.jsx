import InputField from "../InputField/InputField";
import ActionBtn from "../ActionBtn/ActionBtn";
import {Accordion, AccordionDetails, AccordionSummary, Box, Paper, Stack} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getIsWordListFormVisible, getIsListNameInputVisible, uiAction} from "../../redux/ui_slice";
import {useEffect, useRef, useState} from "react";
import {wordListAction} from "../../redux/wordList_slice";

export const AddWordList = () => {
  const dispatch = useDispatch();
  const isInputVisible  = useSelector(getIsListNameInputVisible)
  const isFormVisible  = useSelector(getIsWordListFormVisible)

  const [elvInputTitle, setElvInputTitle] = useState(3)
  const [listName, setListName] = useState('')

  const listNameInputRef = useRef(null)

  useEffect(() => {
    if (isInputVisible ) {
      listNameInputRef.current.focus();
    }
  }, [isInputVisible ]);
  const handleToggleInput  = () => {
    dispatch(uiAction.toggleListNameInput())
  }
  const handleListNameChange  = (e) => {
    setListName(e.target.value)
  }
  const openWordListBuilder  = () => {
    if (!listName.trim()) {
      return;
    }
    dispatch(wordListAction.setCurrentListName(listName))
    dispatch(uiAction.showWordListForm())
    dispatch(uiAction.toggleListNameInput())
    setListName('')
    // listNameInputRef.current.focus();
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      openWordListBuilder();
    }
  };
  return (
    <>
      <Accordion elevation={0} expanded={isInputVisible }>
        <AccordionSummary disabled={isFormVisible }>
          <Stack
            sx={{
              width: '100%',
            }}
            justifyContent={'center'}
            direction="row"
          >
            <ActionBtn
              variant={'outlined'}
              color={"success"}
              text={'Створити список слів'}
              funcs={handleToggleInput }
            />
          </Stack>
        </AccordionSummary>
        <AccordionDetails elevation={3}>
          <Paper
            elevation={elvInputTitle}
            sx={{
              padding: "10px 20px"
            }}
            onFocus={() => {
              setElvInputTitle(15)
            }}
            onBlur={() => {
              setElvInputTitle(3)
            }}
          >
            <Stack
              direction={'row'}
              alignItems={'center'}
              spacing={1}
            >
              <Box flex={10}>
                <InputField
                  placeholder='Назва списку'
                  name="listName"
                  value={listName}
                  onChange={handleListNameChange }
                  inputRef={listNameInputRef}
                  onKeyDown={handleKeyDown}
                  flex={10}
                  clear
                />
              </Box>
              <ActionBtn
                variant={'contained'}
                color={"success"}
                text={'Додати'}
                funcs={openWordListBuilder }
                disabled={!listName}
              />
            </Stack>
          </Paper>
        </AccordionDetails>
      </Accordion>
    </>
  )
}