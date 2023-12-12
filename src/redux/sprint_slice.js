import {createSlice} from "@reduxjs/toolkit";

const sprintSlice = createSlice({
  name: 'sprint',
  initialState: {
    sprintTitleText: '',
    sprintLinks: []
  },
  reducers: {
    setSprintTitle: (state, {payload}) => {
      state.sprintTitleText = payload
    },
    addLink: (state, {payload}) => {
      state.sprintLinks.push(payload)
    },
    removeLink: (state, {payload}) => {
      state.sprintLinks = state.sprintLinks.filter(item => item.id !== payload)
    }
  }
})

export const sprintAction = sprintSlice.actions

export const getSprintTitleText = (state) => state.sprint.sprintTitleText
export const getSprintLinks = (state) => state.sprint.sprintLinks

export default sprintSlice