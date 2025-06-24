import React, {useEffect, useRef, useState} from 'react';
import InputField from "../InputField/InputField";
import ActionBtn from "../ActionBtn/ActionBtn";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import {IconButton, Paper, Tooltip} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import InputPaper from "./InputPaper";
import {wordListAction} from "../../redux/wordList_slice";
import {useDispatch, useSelector} from "react-redux";
import {getEditingWord} from "../../redux/selectors/wordSelectors";

const LATIN_REGEX = /^[a-zA-Z\s'-]*$/;
const CYRILLIC_REGEX = /^[а-яА-ЯёЁіІїЇєЄ\s'-]*$/;

const AddWordPairForm = () => {
  const dispatch = useDispatch();
  const wordToEdit = useSelector(getEditingWord)

  const [input1, setInput1] = useState('')
  const [input2, setInput2] = useState('')
  const [editingData, setEditingData] = useState(null);
  const [isSwapped, setIsSwapped] = useState(false)

  const [errors, setErrors] = useState({ input1: '', input2: '' });

  const input1Ref = useRef(null)
  const input2Ref = useRef(null);

  useEffect(() => {
    input1Ref.current.focus();
  }, []);
  
  useEffect(() => {
    const validate = () => {
      const newErrors = { input1: '', input2: '' };

      const [pattern1, pattern2] = isSwapped
        ? [CYRILLIC_REGEX, LATIN_REGEX]
        : [LATIN_REGEX, CYRILLIC_REGEX];

      const [lang1, lang2] = isSwapped
        ? ['кирилиці', 'латиниці']
        : ['латиниці', 'кирилиці'];

      if (input1 && !pattern1.test(input1)) {
        newErrors.input1 = `Це поле для ${lang1}`;
      }
      if (input2 && !pattern2.test(input2)) {
        newErrors.input2 = `Це поле для ${lang2}`;
      }

      setErrors(newErrors);
    };

    validate();
  }, [input1, input2, isSwapped]);

  useEffect(() => {
    if (wordToEdit) {
      setIsSwapped(false);
      setInput1(wordToEdit.word);
      setInput2(wordToEdit.translation);
      setEditingData(wordToEdit);
      dispatch(wordListAction.clearEditingWord());
      input1Ref.current.focus();
    }
  }, [wordToEdit, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'input1') {
      setInput1(value);
    } else if (name === 'input2') {
      setInput2(value);
    }
  }

  const handleSubmit = () => {
    if (!input1.trim() || !input2.trim() || errors.input1 || errors.input2) return;

    const word = isSwapped ? input2.trim() : input1.trim();
    const translation = isSwapped ? input1.trim() : input2.trim();

    if(editingData){
      dispatch(wordListAction.updateWordInCurrentList({
        id: editingData.id,
        word,
        translation,
        isLearned: editingData.isLearned,
      }))
    } else {
      dispatch(wordListAction.addWord({
        word,
        translation,
      }));
    }

    setInput2('');
    setInput1('');
    setEditingData(null);
    input1Ref.current.focus();
  }

  const handleSwap = () => {
    setIsSwapped(prev => !prev);
  }

  const handleInput1KeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      input2Ref.current.focus();
    }
  };

  const handleInput2KeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit ();
    }
  };

  return (
    <Paper
      sx={{
        padding: ' 10px',
        backgroundColor: '#D9D9D9'
      }}
    >
      <Grid container spacing={2}  alignItems="flex-start">
        <Grid xs={12} sm={5.5}>
          <InputPaper>
            <InputField
              inputRef={input1Ref }
              placeholder={isSwapped ? 'Переклад (укр)' : 'Слово (англ)'}
              value={input1}
              name={'input1'}
              onChange={handleChange}
              onKeyDown={handleInput1KeyDown}
              error={!!errors.input1}
              helperText={errors.input1}
              clear
            />
          </InputPaper>
        </Grid>
        <Grid xs={12} sm={1} container justifyContent="center" alignItems="center" sx={{pt: '8px'}}>
          <Tooltip title="Поміняти мови місцями">
            <IconButton onClick={handleSwap}>
              <SwapHorizIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid xs={12} sm={5.5}>
          <InputPaper>
            <InputField
              inputRef={input2Ref }
              placeholder={isSwapped ? 'Слово (англ)' : 'Переклад (укр)'}
              value={input2}
              name={'input2'}
              onChange={handleChange}
              onKeyDown={handleInput2KeyDown}
              error={!!errors.input2}
              helperText={errors.input2}
              clear
            />
          </InputPaper>
        </Grid>
        <Grid xs={12}>
          <ActionBtn
            fullWidth={true}
            variant={'contained'}
            color={"success"}
            text={editingData ? 'Оновити слово' : 'Додати слово'}
            funcs={handleSubmit}
            type={'submit'}
            disabled={!input1.trim() || !input2.trim() || !!errors.input1 || !!errors.input2}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddWordPairForm;