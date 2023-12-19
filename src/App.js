import './App.css';
import {AddSprint} from "./components/AddSprint/AddSprint";
import SprintBuild from "./components/SprintForm/SprintBuild";
import Grid from "@mui/material/Unstable_Grid2";
import Title from "./components/Title/Title";
import AddedSprints from "./components/AddedSprints/AddedSprints";
import {Container, Slide} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getSprintForm, getSprintLists, uiAction} from "./redux/ui_slice";
import {getListOfSprints} from "./redux/sprint_slice";
import React, {useEffect} from "react";

function App() {
  const dispatch = useDispatch();
  const sprintForm = useSelector(getSprintForm)
  const sprintList = useSelector(getSprintLists)
  const ListOfSprints = useSelector(getListOfSprints)

  useEffect(() => {
    if (ListOfSprints.length && !sprintList){
      dispatch(uiAction.openSprintLists())
    }
  });

  return (
    <>
      <Container>
        <Title/>
        <AddSprint/>
      </Container>
      <Container>
        <Grid
          container
          justifyContent={'space-around'}
          spacing={3}
        >
            <Slide direction="right" in={sprintForm} mountOnEnter unmountOnExit>
              <Grid
                xs={12}
                sm={10}
                lg={6}
                sx={sprintForm ? {height: "auto"} : {height: 0}}
              >
                <SprintBuild/>
              </Grid>
            </Slide>
          <Slide direction="left" in={sprintList} mountOnEnter unmountOnExit>
            <Grid xs={12} sm={10} lg={6}>
              <AddedSprints/>
            </Grid>
          </Slide>
        </Grid>
      </Container>
    </>
  );
}

export default App;
