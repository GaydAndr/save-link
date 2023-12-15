import './App.css';
import {AddSprint} from "./components/AddSprint/AddSprint";
import SprintBuild from "./components/SprintForm/SprintBuild";
import Grid from "@mui/material/Unstable_Grid2";
import Title from "./components/Title/Title";
import AddedSprints from "./components/AddedSprints/AddedSprints";
import {Container, Slide, Zoom} from "@mui/material";
import {useSelector} from "react-redux";
import {getSprintForm} from "./redux/ui_slice";

function App() {
  const sprintForm = useSelector(getSprintForm)

  // const handleSprintTitle = (e) => {
  //   if (!e) {
  //     setSprintTitle('')
  //     return
  //   }
  //   setSprintTitle(e.target.value)
  // }

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
          <Slide direction="down" in={sprintForm} mountOnEnter unmountOnExit>
            <Grid xs={12} sm={10} lg={6}
                  sx={sprintForm ? {height: "auto"} : {height: 0}}
            >
              <SprintBuild/>
            </Grid>
          </Slide>
          <Grid xs={12} sm={10} lg={6}>
            <AddedSprints/>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
