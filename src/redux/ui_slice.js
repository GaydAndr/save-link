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
    // showCancelEditBtn: (state) => {
    //   state.isCancelEditBtnVisible = true;
    // },
    // hideCancelEditBtn: (state) => {
    //   state.isCancelEditBtnVisible = false;
    // },
    //
    // startEditModeForList: (state, { payload }) => {
    //   state.activeEditingListId = payload;
    // },
    // endEditMode: (state) => {
    //   state.activeEditingListId = null;
    // }
  }
})

export const uiAction = uiSlice.actions;

export const getIsWordListFormVisible = (state) => state.ui.isWordListFormVisible;
export const getAreWordListsVisible = (state) => state.ui.areWordListsVisible;
export const getModalType = (state) => state.ui.modalType;
export const getIsListNameInputVisible = (state) => state.ui.isListNameInputVisible;
// export const getIsCancelEditBtnVisible = (state) => state.ui.isCancelEditBtnVisible;
// export const getActiveEditingListId = (state) => state.ui.activeEditingListId;

export default uiSlice;