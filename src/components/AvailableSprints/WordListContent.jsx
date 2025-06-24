
import { selectFilteredWordsByListId } from "../../redux/selectors/wordSelectors";
import {useSelector} from "react-redux";
import {List} from "@mui/material";
import WordItem from "./WordItem";

const WordListContent = ({ listId }) => {
  const filteredWords = useSelector(state => selectFilteredWordsByListId(state, listId));

  return (
    <List disablePadding sx={{ bgcolor: 'rgba(231,116,255,0.32)' }}>
      {filteredWords.map((wordObject) => (
        <WordItem
          key={wordObject.id}
          word={wordObject}
          listId={listId}
        />
      ))}
    </List>
  );
};

export default WordListContent;