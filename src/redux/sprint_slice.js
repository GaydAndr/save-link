import {createSlice} from "@reduxjs/toolkit";

const sprintSlice = createSlice({
  name: 'sprint',
  initialState: {
    sprintTitleText: '',
    sprintLinks: [],
    listOfSprints: []
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
    },
    clearSprintList: (state) => {
      state.sprintLinks = []
    },
    addSprint: (state, {payload}) => {
      state.listOfSprints.push(payload)
    },
    removeSprint: (state, {payload}) => {
      state.listOfSprints = state.listOfSprints.filter(item => item.id !== payload)
    },
    clearListOfSprint: (state) => {
      state.listOfSprints = []
    },
  }
})

export const sprintAction = sprintSlice.actions

export const getSprintTitleText = (state) => state.sprint.sprintTitleText
export const getSprintLinks = (state) => state.sprint.sprintLinks
export const getListOfSprints = (state) => state.sprint.listOfSprints

export default sprintSlice