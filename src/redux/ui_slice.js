import {createSlice} from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    titleInput: false,
    sprintForm: false,
    sprintLists: false,
    modalState: false
  },
  reducers: {
    toggleTitleInput: (state) => {
      state.titleInput = !state.titleInput
    },
    toggleSprintForm: (state) => {
      state.sprintForm = !state.sprintForm
    },
    closeSprintLists: (state) => {
      state.sprintLists = false
    },
    openSprintLists: (state) => {
      state.sprintLists = true
    },
    openModal: (state) => {
      state.modalState = true
    },
    closeModal: (state) => {
      state.modalState = false
    },

  }
})

export const uiAction = uiSlice.actions

export const getTitleInput = (state) => state.ui.titleInput
export const getSprintForm = (state) => state.ui.sprintForm
export const getSprintLists = (state) => state.ui.sprintLists
export const getModalState = (state) => state.ui.modalState

export default uiSlice