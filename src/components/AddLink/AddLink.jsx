import React, {useContext} from 'react';
import InputField from "../InputField/InputField";
import SelectLinkType from "../SelectLinkType/SelectLinkType";
import ActionBtn from "../ActionBtn/ActionBtn";
import {Paper} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {SprintContext} from "../SprintBuild/SprintBuild";

const AddLink = () => {
  const {
    linkTitle,
    handleChange,
    linkBody,
    createSprintItem,
  } = useContext(SprintContext);

  return (
    <Paper
      sx={{
        padding: ' 10px',
        backgroundColor: '#D9D9D9'
      }}
    >
      <Grid container spacing={1}>
        <Grid xs={7}>
          <InputField
            clear={true}
            placeholder={'Заголовок посилання'}
            value={linkTitle}
            name={'linkTitle'}
            func={handleChange}
          />
        </Grid>
        <Grid xs={5}>
          <SelectLinkType/>
        </Grid>
        <Grid xs={8}>
          <InputField
            clear={true}
            placeholder={'Текст посилання'}
            value={linkBody}
            name={'linkBody'}
            func={handleChange}
          />
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