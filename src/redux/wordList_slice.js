import { createSlice } from "@reduxjs/toolkit";

const wordListSlice = createSlice({
  name: 'wordLists',

  initialState: {
    isListNameSaved: true,
    currentListName: '',
    currentWords: [],

    wordLists: [],
    editingListId: null,
    editingWord: null,
  },
  reducers: {
    // --- РЕДЬЮСЕРИ ДЛЯ КЕРУВАННЯ БУФЕРОМ РЕДАГУВАННЯ ---

    setIsListNameSaved: (state, { payload }) => {
      state.isListNameSaved = payload;
    },
    setCurrentListName: (state, { payload }) => {
      state.currentListName = payload;
    },
    addWord: (state, { payload }) => {
      const newWord = {
        id: new Date().toISOString(),
        word: payload.word,
        translation: payload.translation,
        isLearned: false,
      };
      state.currentWords.push(newWord);
    },
    removeWord: (state, { payload }) => {
      state.currentWords = state.currentWords.filter(item => item.id !== payload);
    },
    clearCurrentList: (state) => {
      state.currentListName = '';
      state.currentWords = [];
      state.editingListId = null;
      state.editingWord = null;
    },

    // --- РЕДЬЮСЕРИ ДЛЯ КЕРУВАННЯ ОСНОВНИМ МАСИВОМ СПИСКІВ ---

    addWordList: (state, { payload }) => {
      const newList = {
        id: new Date().toISOString(),
        listName: payload.listName,
        words: payload.words,
      };
      state.wordLists.push(newList);
    },
    removeWordList: (state, { payload }) => {
      state.wordLists = state.wordLists.filter(list => list.id !== payload);
    },

    // --- РЕДЬЮСЕРИ ДЛЯ РЕДАГУВАННЯ ---

    // Завантажує список з wordLists в буфер для редагування
    startEditingList: (state, { payload }) => {
      const listToEdit = state.wordLists.find(list => list.id === payload);
      if (listToEdit) {
        state.currentListName = listToEdit.listName;
        state.currentWords = listToEdit.words;
        state.editingListId = listToEdit.id;
      }
    },
    // Зберігає зміни з буфера назад в основний масив
    saveEditedList: (state, { payload }) => {
      state.wordLists = state.wordLists.map(list =>
        list.id === state.editingListId
          ? { ...list, listName: state.currentListName, words: state.currentWords }
          : list
      );
      // Очищуємо буфер після збереження
      state.currentListName = '';
      state.currentWords = [];
      state.editingListId = null;
    },

    toggleWordLearnedStatus: (state, { payload }) => {
      const { listId, wordId } = payload;

      const targetList = state.wordLists.find(list => list.id === listId);
      if (targetList) {
        const targetWord = targetList.words.find(word => word.id === wordId);
        if (targetWord) {
          targetWord.isLearned = !targetWord.isLearned;
        }
      }
    },
  }
});

export const wordListAction = wordListSlice.actions;

export const getIsListNameSaved = (state) => state.wordLists.isListNameSaved;
export const getCurrentListName = (state) => state.wordLists.currentListName;
export const getCurrentWords = (state) => state.wordLists.currentWords;
export const getAllWordLists = (state) => state.wordLists.wordLists;
export const getEditingListId = (state) => state.wordLists.editingListId;

export default wordListSlice;