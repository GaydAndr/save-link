import React, { useEffect, useRef, useState} from 'react';
import InputField from "../InputField/InputField";
import SelectLinkType from "./SelectLinkType";
import ActionBtn from "../ActionBtn/ActionBtn";
import {Paper} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import InputPaper from "./InputPaper";
import {v4 as uuidv4} from "uuid";
import {sprintAction} from "../../redux/sprint_slice";
import {useDispatch} from "react-redux";

const AddLink = () => {
  const dispatch = useDispatch();

  const [linkType, setLinkType] = useState('');
  const [linkTitle, setLinkTitle] = useState('')
  const [linkBody, setLinkBody] = useState('')

  const linkInputRef = useRef(null)

  useEffect(() => {
    linkInputRef.current.focus();
  }, []);

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

  return (
    <Paper
      sx={{
        padding: ' 10px',
        backgroundColor: '#D9D9D9'
      }}
    >
      <Grid container spacing={2}>
        <Grid xs={7}>
          <InputPaper>
            <InputField
              placeholder={'Заголовок посилання'}
              value={linkTitle}
              name={'linkTitle'}
              func={handleChange}
            />
          </InputPaper>
        </Grid>
        <Grid xs={5}>
          <InputPaper>
            <SelectLinkType linkType={linkType} handleChange={handleChange}/>
          </InputPaper>
        </Grid>
        <Grid xs={8}>
          <InputPaper>
            <InputField
              refValue={linkInputRef}
              placeholder={'Текст посилання'}
              value={linkBody}
              name={'linkBody'}
              func={handleChange}
              clear
            />
          </InputPaper>
        </Grid>
        <Grid xs={4}>
          <ActionBtn
            fullWidth={true}
            variant={'contained'}
            color={"success"}
            text={'Додати'}
            funcs={createSprintItem}
            type={'submit'}
          />
        </Grid>
      </Grid>

    </Paper>
  );
};

export default AddLink;