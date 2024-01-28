import {createSlice} from "@reduxjs/toolkit";

const sprintSlice = createSlice({
  name: 'sprint',
  initialState: {
    sprintTitleText: '',
    sprintLinks: [],
    listOfSprints: [],
    currentLink: null,
    currentCategoryIndex : null,
  },
  reducers: {
    setSprintTitle: (state, {payload}) => {
      state.sprintTitleText = payload
    },
    addLink: (state, {payload}) => {
      state.sprintLinks = [payload, ...state.sprintLinks]
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
    editSprint: (state, {payload}) => {
      const currentCategory= state.listOfSprints.find((item,i) => item.id === payload)
      state.sprintTitleText = currentCategory.sprintTitle
      state.sprintLinks = currentCategory.sprintLinks
      state.currentCategoryIndex  = state.listOfSprints.findIndex(item => item.id === payload);
    },
    clearListOfSprint: (state) => {
      state.listOfSprints = []
    },
    editLink: (state, {payload}) => {
      state.currentLink = state.sprintLinks.find(item => item.id === payload)
    },
    clearCurrentLink: (state) => {
      state.currentLink = null
    },
    redactedList: (state, {payload})=>{
      state.listOfSprints[state.currentCategoryIndex].sprintLinks = payload;
      state.currentCategoryIndex = null
    },
    cancelEdit: (state, {payload})=>{
      state.currentCategoryIndex = null
    }
  }
})

export const sprintAction = sprintSlice.actions

export const getSprintTitleText = (state) => state.sprint.sprintTitleText
export const getSprintLinks = (state) => state.sprint.sprintLinks
export const getListOfSprints = (state) => state.sprint.listOfSprints
export const getCurrentLink = (state) => state.sprint.currentLink
export const getCurrentindex = (state) => state.sprint.currentCategoryIndex

export default sprintSlice