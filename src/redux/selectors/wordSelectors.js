import { createSelector } from 'reselect';
import { getSearchQuery } from '../ui_slice';
import { type RootState, type WordList } from '../../types';

const selectWordListState = (state: RootState) => state.wordLists;

export const getAllWordLists = createSelector(
  [selectWordListState],
  (state): WordList[] => state.wordLists
);

export const getCurrentWords = createSelector(
  [selectWordListState],
  state => state.currentWords
);


export const selectFilteredWordLists = createSelector(
  [getAllWordLists, getSearchQuery],
  (wordLists, searchQuery) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return wordLists;

    return wordLists.filter(list => {
      const isListTitleMatch = list.listName.toLowerCase().includes(query);
      const hasMatchingWords = list.words.some(word =>
        word.word.toLowerCase().includes(query) ||
        word.translation.toLowerCase().includes(query)
      );
      return isListTitleMatch || hasMatchingWords;
    });
  }
);

export const selectWordsByListId = createSelector(
  [getAllWordLists, (_, listId) => listId],
  (wordLists, listId) => {
    const list = wordLists.find(list => list.id === listId);
    return list ? list.words : [];
  }
);

export const selectFilteredWordsByListId = createSelector(
  // [selectWordsByListId, getSearchQuery],
  // (words, searchQuery) => {
  //   const query = searchQuery.toLowerCase().trim();
  //   console.log('Filtering with query:', query); // Для відлагодження
  //   console.log('Words before filtering:', words); // Для відлагодження
  //
  //   if (!query) return words;
  //
  //   const filtered = words.filter(word =>
  //     word.word.toLowerCase().includes(query) ||
  //     word.translation.toLowerCase().includes(query)
  //   );
  //
  //   console.log('Filtered words:', filtered); // Для відлагодження
  //   return filtered;
  // }
  [selectWordsByListId, getSearchQuery],
  (words, searchQuery):WordList[] => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return words;

    return words.filter(word =>
      word.word.toLowerCase().includes(query) ||
      word.translation.toLowerCase().includes(query)
    );
  }
);
// Базові селектори
export const getIsListNameSaved = createSelector(
  [selectWordListState],
  state => state.isListNameSaved
);

export const getCurrentListName = createSelector(
  [selectWordListState],
  state => state.currentListName
);


export const getEditingListId = createSelector(
  [selectWordListState],
  state => state.editingListId
);

export const getEditingWord = createSelector(
  [selectWordListState],
  state => state.editingWord
);

// export const selectSearchQuery = createSelector(
//   [selectWordListState],
//   (state):WordList[] => state.searchQuery || ''
// );


// Селектори для статистики
// export const selectWordsStatistics = createSelector(
//   [selectWordsByListId],
//   (words) => ({
//     total: words.length,
//     learned: words.filter(w => w.isLearned).length,
//     unlearned: words.filter(w => !w.isLearned).length
//   })
// );

// export const selectListStatistics = createSelector(
//   [getAllWordLists],
//   (lists) => ({
//     totalLists: lists.length,
//     totalWords: lists.reduce((acc, list) => acc + list.words.length, 0),
//     learnedWords: lists.reduce(
//       (acc, list) => acc + list.words.filter(w => w.isLearned).length,
//       0
//     )
//   })
// );

// export const selectFilteredWords = createSelector(
//   [
//     state => {
//       return state.wordLists.wordLists;
//     },
//     selectSearchQuery,
//     (_, listId) => listId
//   ],
//   (wordLists, searchQuery, listId) => {
//
//     const list = wordLists.find(l => l.id === listId);
//     const words = list ? list.words : [];
//
//     if (!searchQuery || !searchQuery.trim()) {
//       return words;
//     }
//
//     const query = searchQuery.toLowerCase().trim();
//     return words.filter(word =>
//       word.word.toLowerCase().includes(query) ||
//       word.translation.toLowerCase().includes(query)
//     );
//   }
// );
