import InputField from "../InputField/InputField";
import ActionBtn from "../ActionBtn/ActionBtn";
import {Accordion, AccordionDetails, AccordionSummary, Box, InputBase, Paper, Stack, styled} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getSprintForm, getTitleInput, uiAction} from "../../redux/ui_slice";
import {useEffect, useRef, useState} from "react";
import {sprintAction} from "../../redux/sprint_slice";

export const AddSprint = () => {
  const dispatch = useDispatch();
  const titleInput = useSelector(getTitleInput)
  const sprintForm = useSelector(getSprintForm)

  const [elvInputTitle, setElvInputTitle] = useState(3)
  const [titleText, setTitleText] = useState('')

  const sprintTitleInputRef = useRef(null)

  useEffect(() => {
    if (titleInput) {
      sprintTitleInputRef.current.focus();
    }
  }, [titleInput]);
  const handleTitleInput = () => {
    dispatch(uiAction.toggleTitleInput())
  }
  const handleSprintTitle = (e) => {
    setTitleText(e.target.value)
  }
  const openSprintBuilder = () => {
    dispatch(sprintAction.setSprintTitle(titleText))
    dispatch(uiAction.openSprintForm())
    dispatch(uiAction.toggleTitleInput())
    setTitleText('')
    sprintTitleInputRef.current.focus();
  }
  return (
    <>
      <Accordion elevation={0} expanded={titleInput}>
        <AccordionSummary disabled={sprintForm}>
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
              text={'Створити категорію'}
              funcs={handleTitleInput}
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
                  placeholder='Назва спринта'
                  clear
                  flex={10}
                  value={titleText}
                  func={handleSprintTitle}
                  refValue={sprintTitleInputRef}
                />
              </Box>
              <ActionBtn
                variant={'contained'}
                color={"success"}
                text={'Додати'}
                funcs={openSprintBuilder}
              />
            </Stack>
          </Paper>
        </AccordionDetails>
      </Accordion>
    </>
  )
}