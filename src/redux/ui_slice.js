import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isWordListFormVisible: false,
    areWordListsVisible: false,
    isModalVisible: false,

    isListNameInputVisible: false,
    isCancelEditBtnVisible: false,

    activeEditingListId: null,
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

    showModal: (state) => {
      state.isModalVisible = true;
    },
    hideModal: (state) => {
      state.isModalVisible = false;
    },

    toggleListNameInput: (state) => {
      state.isListNameInputVisible = !state.isListNameInputVisible;
    },
    showCancelEditBtn: (state) => {
      state.isCancelEditBtnVisible = true;
    },
    hideCancelEditBtn: (state) => {
      state.isCancelEditBtnVisible = false;
    },

    startEditModeForList: (state, { payload }) => {
      state.activeEditingListId = payload;
    },
    endEditMode: (state) => {
      state.activeEditingListId = null;
    }
  }
})

export const uiAction = uiSlice.actions;

export const getIsWordListFormVisible = (state) => state.ui.isWordListFormVisible;
export const getAreWordListsVisible = (state) => state.ui.areWordListsVisible;
export const getIsModalVisible = (state) => state.ui.isModalVisible;
export const getIsListNameInputVisible = (state) => state.ui.isListNameInputVisible;
export const getIsCancelEditBtnVisible = (state) => state.ui.isCancelEditBtnVisible;
export const getActiveEditingListId = (state) => state.ui.activeEditingListId;

export default uiSlice;