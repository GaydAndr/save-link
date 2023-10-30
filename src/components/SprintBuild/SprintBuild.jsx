import React, {createContext, useContext, useEffect, useState} from "react";
import SprintTitle from "../SprintTitle/SprintTitle";
import AddLink from "../AddLink/AddLink";
import ActionBtn from "../ActionBtn/ActionBtn";
import SprintLink from "../SprintLink/SprintLink";
import {Paper, Stack} from "@mui/material";
import {SprintTitleContext} from "../../App";
import {v4 as uuidv4} from 'uuid';

export const SprintContext = createContext();

const sprintObject = {
  'sprintTitle': '',
  'sprintLinks': []
}
const SprintBuild = () => {
  const {sprintTitleText, handleSprintTitle, handleExpanded, handleVisible } = useContext(SprintTitleContext);

  sprintObject.sprintTitle = sprintTitleText
  const sprintLinks = sprintObject.sprintLinks

  const [linkType, setLinkType] = useState('');
  const [linkTitle, setLinkTitle] = useState('')
  const [linkBody, setLinkBody] = useState('')
  const [deleteItem, setDeleteItem] = useState('')

  const handleChange=(e)=>{
 console.log(e.target)
    switch (e.target.name){
      case 'linkTitle':
        setLinkTitle(e.target.value);
        break
      case 'linkBody':
        setLinkBody(e.target.value);
        break
      case 'linkType':
        setLinkType(e.target.value);
        break
    }

  }

  const handleChangeLinkTitle = (value) => {
    setLinkTitle(value);
  };
  const handleChangeLinkBody = (value) => {
    setLinkBody(value);
  };
  const handleChangeLinkType = (event) => {
    setLinkType(event.target.value);
  };

  const handelDelete = (id) => {
    setDeleteItem(id)
    sprintObject.sprintLinks = sprintObject.sprintLinks.filter(item => item.id !== id)
  }

  const createSprintItem = () => {
    const sprintItem = {
      'id': uuidv4(),
      'title': linkTitle,
      'body': linkBody,
      'type': linkType
    }
    sprintObject.sprintLinks.push(sprintItem)
    setLinkType('')
    setLinkBody('');
    setLinkTitle('');
  }

  const createSprint = () => {
    console.log(sprintObject)
    handleSprintTitle('')
    handleVisible()
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
        elevation={10}
        sx={{
          padding: 1,
          backgroundColor: '#9C9C9C'
        }}
      >
        <Stack spacing={1}>
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