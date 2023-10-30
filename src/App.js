import './App.css';
import {AddSprint} from "./components/AddSprint/AddSprint";
import SprintBuild from "./components/SprintBuild/SprintBuild";
import Grid from "@mui/material/Unstable_Grid2";
import Title from "./components/Title/Title";
import AddedSprints from "./components/AddedSprints/AddedSprints";
import {Container} from "@mui/material";
import {createContext, useState} from "react";

export const SprintTitleContext = createContext();

function App() {
  const [sprintTitleText, setSprintTitle] = useState('')
  const [showSprintForm, setShowSprintForm] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const handleVisible = () => {
    setShowSprintForm(!showSprintForm)
  }
  const handleExpanded = () => {
    setExpanded(!expanded)
  }
  const handleSprintTitle = (e) => {
    setSprintTitle(e.target.value)
  }
  const value = {
    handleSprintTitle,
    handleExpanded,
    handleVisible,
    sprintTitleText,
    expanded,
    showSprintForm
  }

  return (
    <SprintTitleContext.Provider value={value}>
      <Container>
        <Title/>
        <AddSprint/>
      </Container>
      <Container>
        <Grid
          container
          justifyContent={'space-around'}
          spacing={1}
        >
          <Grid xs={6}>
            <AddedSprints/>
          </Grid>
          {showSprintForm && <Grid xs={6}>
            <SprintBuild/>
          </Grid>}
        </Grid>
      </Container>
    </SprintTitleContext.Provider>

  );
}

export default App;
