import SprintTitle from "./SprintTitle";
import AddLink from "./AddLink";
import ActionBtn from "../ActionBtn/ActionBtn";
import SprintLink from "../SprintLink/SprintLink";
import {Box, Paper, Stack, Tooltip} from "@mui/material";
import {v4 as uuidv4} from 'uuid';
import {useDispatch, useSelector} from "react-redux";
import {
  getCurrentId, getCurrentLink,
  getSprintLinks,
  getSprintTitleText,
  getTitleIsSave,
  sprintAction
} from "../../redux/sprint_slice";
import {uiAction} from "../../redux/ui_slice";
import MyModal from "../Modal/MyModal";
import {useEffect, useState} from "react";
import CloseCategoryBuilder from "./CloseCategoryBuilder";

const SprintBuild = () => {
  const dispatch = useDispatch();
  const sprintTitle = useSelector(getSprintTitleText)
  const sprintLinks = useSelector(getSprintLinks)
  const titleIsSave = useSelector(getTitleIsSave)
  const editCategoryId = useSelector(getCurrentId)
  const currentLink = useSelector(getCurrentLink)
  const [typeAlert, setTypeAlert] = useState('')

  const createSprint = () => {
    if (!titleIsSave) {
      dispatch(sprintAction.toggleTitleIsSave())
    }
    if (!sprintTitle) {
      openInfoModal()
      return
    }
    if (editCategoryId) {
      if(currentLink){
        dispatch(sprintAction.addLink(currentLink))
        console.log(sprintLinks.length)
      }
      newSetNewLinks()
      return;
    }



    const sprintObject = {
      'id': uuidv4(),
      sprintTitle,
      sprintLinks
    }
    dispatch(uiAction.openSprintLists())
    dispatch(sprintAction.addSprint(sprintObject))
    closeFormActions()
  }
  const handleClose = () => {
    dispatch(uiAction.closeModal())
    setTypeAlert('')
  };
  const openInfoModal = () => {
    setTypeAlert('infoAlert')
    dispatch(uiAction.openModal())
  };

  const cancelEdit = () => {
    dispatch(sprintAction.removeCurrentId())
    closeFormActions()
  };
  const newSetNewLinks = () => {
    dispatch(sprintAction.redactedList(currentLink?
      [currentLink, ...sprintLinks] : sprintLinks
    ))
    dispatch(sprintAction.removeCurrentId())
    closeFormActions()
  };

  const closeFormActions = () => {
    dispatch(sprintAction.clearSprintList())
    dispatch(sprintAction.setSprintTitle(''))
    dispatch(sprintAction.removeCurrentLink())
    dispatch(uiAction.closeSprintForm())
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
          <SprintTitle/>
          <CloseCategoryBuilder/>
        </Stack>

        <AddLink/>
        <Stack
          spacing={2}
          direction={'row'}
          justifyContent="space-between"
        >
          <Tooltip
            title={!sprintLinks[0]?'Додайте посилання':'Зберегти категорію'}
            disableInteractive
            placement="top"
          >
            <Box width={'100%'}>
              <ActionBtn
                variant={'contained'}
                color={"success"}
                text={'Зберегти'}
                funcs={createSprint}
                disabled={!sprintLinks[0]}
                fullWidth
              />
            </Box>
          </Tooltip>
          {editCategoryId && <ActionBtn
            variant={'contained'}
            color={"warning"}
            text={'Відмінити'}
            funcs={cancelEdit}
            fullWidth
          />}
        </Stack>
        {sprintLinks[0] &&
          sprintLinks.map(item => {
            return <SprintLink
              key={item.id}
              id={item.id}
              type={item.type}
              title={item.title}
              href={item.href}
            />
          })
        }

      </Stack>
      {typeAlert &&
        <MyModal typeAlert={typeAlert} agreeFunc={createSprint} handleClose={handleClose}/>
      }
    </Paper>
  );
};

export default SprintBuild;