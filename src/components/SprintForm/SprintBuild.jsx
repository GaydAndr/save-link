import React, {createContext, useEffect, useState} from "react";
import SprintTitle from "./SprintTitle";
import AddLink from "./AddLink";
import ActionBtn from "../ActionBtn/ActionBtn";
import SprintLink from "../SprintLink/SprintLink";
import {Paper, Stack} from "@mui/material";
import {v4 as uuidv4} from 'uuid';
// import {saveData} from "../../service/saveDada";
import {useDispatch, useSelector} from "react-redux";
import {getSprintLinks, getSprintTitleText, sprintAction} from "../../redux/sprint_slice";

export const SprintContext = createContext();

const sprintObject = {
  'id': '',
  'sprintTitle': '',
  'sprintLinks': []
}
const SprintBuild = () => {
  const dispatch = useDispatch();
  const sprintTitle = useSelector(getSprintTitleText)
  const sprintLinks = useSelector(getSprintLinks)

  // sprintObject.sprintTitle = sprintTitleText
  sprintObject.id = uuidv4()
  // const sprintLinks = sprintObject.sprintLinks

  const [linkType, setLinkType] = useState('');
  const [linkTitle, setLinkTitle] = useState('')
  const [linkBody, setLinkBody] = useState('')
  const [deleteItem, setDeleteItem] = useState('')


  const handleChange = (e) => {
    switch (e.target.name) {
      case 'linkTitle':
        setLinkTitle(e.target.value);
        break
      case 'linkBody':
        setLinkBody(e.target.value);
        break
      case 'linkType':
        setLinkType(e.target.value);
        break
      default:
        return;
    }

  }

  const handelDelete = (id) => {
    setDeleteItem(id)
    sprintObject.sprintLinks = sprintObject.sprintLinks.filter(item => item.id !== id)
  }

  const createSprintItem = () => {
    const sprintItem = {
      'id': uuidv4(),
      'title': linkTitle,
      'href': linkBody,
      'type': linkType
    }
    dispatch(sprintAction.addLink(sprintItem))
    setLinkType('')
    setLinkBody('');
    setLinkTitle('');
  }
  const createSprint = () => {
    // localStorage.setItem("sprintList", JSON.stringify(sprintObject));
    // saveData(sprintObject).then((res) => {
    // })
    // handleSprintTitle('')
    // handleVisible()
    sprintObject.sprintTitle = ''
    sprintObject.sprintLinks = []
  }

  useEffect(() => {
  }, [deleteItem]);

  const value = {
    linkType,
    linkTitle,
    linkBody,
    handleChange,
    createSprintItem,
  }

  return (
    <SprintContext.Provider value={value}>
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
                handelDelete={handelDelete}
                type={item.type}
                title={item.title}
                href={item.href}
              />
            })

          }
          <ActionBtn
            variant={'contained'}
            color={"success"}
            text={'Додати спритн'}
            funcs={createSprint}
          />
        </Stack>
      </Paper>
    </SprintContext.Provider>
  );
};

export default SprintBuild;