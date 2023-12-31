import SprintTitle from "./SprintTitle";
import AddLink from "./AddLink";
import ActionBtn from "../ActionBtn/ActionBtn";
import SprintLink from "../SprintLink/SprintLink";
import {Paper, Stack} from "@mui/material";
import {v4 as uuidv4} from 'uuid';
import {useDispatch, useSelector} from "react-redux";
import {getSprintLinks, getSprintTitleText, sprintAction} from "../../redux/sprint_slice";
import {uiAction} from "../../redux/ui_slice";
import MyModal from "../Modal/MyModal";
import {useState} from "react";

const SprintBuild = () => {
  const dispatch = useDispatch();
  const sprintTitle = useSelector(getSprintTitleText)
  const sprintLinks = useSelector(getSprintLinks)
  const [typeAlert, setTypeAlert] = useState('')

  const createSprint = () => {
    if (!sprintTitle) {
      openInfoModal()
      return
    }
    const sprintObject = {
      'id': uuidv4(),
      sprintTitle,
      sprintLinks
    }
    dispatch(uiAction.toggleSprintForm())
    dispatch(uiAction.openSprintLists())
    dispatch(sprintAction.addSprint(sprintObject))
    dispatch(sprintAction.clearSprintList())
    dispatch(sprintAction.setSprintTitle(''))
  }
  const handleClose = () => {
    dispatch(uiAction.closeModal())
    setTypeAlert('')
  };
  const openInfoModal = () => {
    setTypeAlert('infoAlert')
    dispatch(uiAction.openModal())
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
        <SprintTitle/>
        <AddLink/>
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
        <ActionBtn
          variant={'contained'}
          color={"success"}
          text={'Зберегти'}
          funcs={createSprint}
        />
      </Stack>
      {typeAlert &&
        <MyModal typeAlert={typeAlert} agreeFunc={createSprint} handleClose={handleClose}/>
      }
    </Paper>
  );
};

export default SprintBuild;