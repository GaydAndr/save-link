import {createSlice} from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    titleInput: false,
    sprintForm: false,
  },
  reducers: {
    toggleTitleInput: (state) => {
      state.titleInput = !state.titleInput
    },
    toggleSprintForm: (state) => {
      state.sprintForm = !state.sprintForm
    },

  }
})

export const uiAction = uiSlice.actions

export const getTitleInput = (state) => state.ui.titleInput
export const getSprintForm = (state) => state.ui.sprintForm

export default uiSlice