import InputField from "../InputField/InputField";
import ActionBtn from "../ActionBtn/ActionBtn";
import {Accordion, AccordionDetails, AccordionSummary, Box, Paper, Stack, Typography} from "@mui/material";
import {useContext} from "react";
import {SprintTitleContext} from "../../App";


export const AddSprint = () => {
  const {expanded, handleExpanded,sprintTitleText, handleSprintTitle,showSprintForm, handleVisible } = useContext(SprintTitleContext);
  return (
    <>
      <Accordion elevation={0} expanded={expanded}>
        <AccordionSummary disabled={showSprintForm}>
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
              text={'Додати спринт'}
              funcs={handleExpanded}
            />
          </Stack>
        </AccordionSummary>
        <AccordionDetails elevation={3}>
          <Paper
            elevation={3}
            sx={{
              padding: "10px 20px"
            }}
          >
            <Stack
              direction={'row'}
              alignItems={'center'}
              spacing={1}
            >
              <Box flex={10}>
                <InputField
                  clear={true}
                  placeholder='Назва спринта'
                  flex={10}
                  value={sprintTitleText}
                  func={handleSprintTitle}
                />
              </Box>
              <ActionBtn
                variant={'contained'}
                color={"success"}
                text={'Додати'}
                funcs={[handleExpanded, handleVisible]}
              />
              {/*<ActionBtn*/}
              {/*  variant={'outlined'}*/}
              {/*  color={"error"}*/}
              {/*  text={'Скасувати'}*/}
              {/*/>*/}
            </Stack>
          </Paper>
        </AccordionDetails>
      </Accordion>
    </>
  )
}