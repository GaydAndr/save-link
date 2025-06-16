import './App.css';
import {AddWordList} from "./components/AddSprint/AddWordList";
import SprintBuild from "./components/SprintForm/SprintBuild";
import Grid from "@mui/material/Unstable_Grid2";
import Title from "./components/Title/Title";
import AddedSprints from "./components/AvailableSprints/WordListsDisplay";
import {Container, Slide} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import { getAreWordListsVisible, uiAction} from "./redux/ui_slice";
import {getAllWordLists} from "./redux/wordList_slice";
import React, {useEffect} from "react";
import { getIsWordListFormVisible} from "./redux/ui_slice"

function App() {
  const dispatch = useDispatch();
  const isFormVisible  = useSelector(getIsWordListFormVisible)
  const areListsVisible  = useSelector(getAreWordListsVisible)
  const wordLists  = useSelector(getAllWordLists)

  useEffect(() => {
    if (wordLists .length && !areListsVisible ){
      dispatch(uiAction.showWordLists())
    }
  }, [wordLists, areListsVisible, dispatch]);

  return (
    <>
      <Container>
        <Title/>
        <AddWordList/>
      </Container>
      <Container>
        <Grid
          container
          justifyContent={'space-around'}
          spacing={3}
        >
            <Slide direction="right" in={isFormVisible } mountOnEnter unmountOnExit>
              <Grid
                xs={12}
                sm={10}
                lg={6}
                sx={isFormVisible  ? {height: "auto"} : {height: 0}}
              >
                <SprintBuild/>
              </Grid>
            </Slide>
          <Slide direction="left" in={areListsVisible } mountOnEnter unmountOnExit>
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
