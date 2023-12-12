import React, {useContext, useEffect, useRef, useState} from 'react';
import InputField from "../InputField/InputField";
import SelectLinkType from "./SelectLinkType";
import ActionBtn from "../ActionBtn/ActionBtn";
import {Paper} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {SprintContext} from "./SprintBuild";
import InputPaper from "./InputPaper";

const AddLink = () => {
  const {
    linkTitle,
    handleChange,
    linkBody,
    createSprintItem,
  } = useContext(SprintContext);

  const linkInputRef = useRef(null)

  useEffect(() => {
    linkInputRef.current.focus();
  }, []);

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
            <SelectLinkType/>
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