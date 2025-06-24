import './App.css';
import {AddWordList} from "./components/AddSprint/AddWordList";
import WordListBuilder from "./components/SprintForm/WordListBuilder";
import Grid from "@mui/material/Unstable_Grid2";
import Title from "./components/Title/Title";
import AddedSprints from "./components/AvailableSprints/WordListsDisplay";
import {Box, Container, Slide} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import { uiAction} from "./redux/ui_slice";
import React, {useEffect} from "react";
import ImportButton from "./components/ImportButton/ImportButton";
import {getAllWordLists} from "./redux/selectors/wordSelectors";
import {getAreWordListsVisible, getIsWordListFormVisible} from "./redux/selectors/uiSelectors";

function App() {
  const dispatch = useDispatch();
  const isFormVisible  = useSelector(getIsWordListFormVisible)
  const areListsVisible  = useSelector(getAreWordListsVisible)
  const wordLists  = useSelector(getAllWordLists)

  useEffect(() => {
    if (wordLists.length && !areListsVisible ){
      dispatch(uiAction.showWordLists())
    }
  }, [wordLists, areListsVisible, dispatch]);

  return (
    <>
      <Container>
        <Title/>
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 2, mt: 2, mb: 2 }}>
          <AddWordList/>
          <ImportButton/>
        </Box>

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
                <WordListBuilder/>
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
