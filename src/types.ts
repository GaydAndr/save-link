
export interface Word {
  id: string;
  word: string;
  translation: string;
  isLearned: boolean;
}

export interface WordList {
  id: string;
  listName: string;
  words: Word[];
}

export interface WordListsState {
  isListNameSaved: boolean;
  currentListName: string;
  currentWords: Word[];
  wordLists: WordList[];
  editingListId: string | null;
  editingWord: Word | null;
}

export interface UiState {
  isWordListFormVisible: boolean;
  areWordListsVisible: boolean;
  modal: { type: string; context?: any } | null;
  isListNameInputVisible: boolean;
  isCancelEditBtnVisible: boolean;
  activeEditingListId: string | null;
  searchQuery: string;
  notification: { message: string; severity: 'success' | 'error' | 'info' | 'warning' } | null;
}

export interface RootState {
  wordLists: WordListsState;
  ui: UiState;
}