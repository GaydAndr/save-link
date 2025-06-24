import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isWordListFormVisible: false,
    areWordListsVisible: false,
    modalType: null,

    isListNameInputVisible: false,
    isCancelEditBtnVisible: false,

    activeEditingListId: null,
    searchQuery: '',
  },
  reducers: {
    showWordListForm: (state) => {
      state.isWordListFormVisible = true;
    },
    hideWordListForm: (state) => {
      state.isWordListFormVisible = false;
    },

    showWordLists: (state) => {
      state.areWordListsVisible = true;
    },
    hideWordLists: (state) => {
      state.areWordListsVisible = false;
    },

    showModal: (state, { payload }) => {
      state.modalType = payload.type;
    },
    hideModal: (state) => {
      state.modalType  = null;
    },

    toggleListNameInput: (state) => {
      state.isListNameInputVisible = !state.isListNameInputVisible;
    },
    setSearchQuery: (state, { payload }) => {
      state.searchQuery = payload;
    },
  }
})

export const uiAction = uiSlice.actions;
export const getSearchQuery = (state) => state.ui.searchQuery;
export default uiSlice;