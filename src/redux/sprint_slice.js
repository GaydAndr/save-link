import {createSlice} from "@reduxjs/toolkit";

const sprintSlice = createSlice({
  name: 'sprint',
  initialState: {
    titleIsSave: true,
    sprintTitleText: '',
    sprintLinks: [],
    listOfSprints: [],
    currentLink: null,
    currentCategoryId: null,
  },
  reducers: {
    toggleTitleIsSave: (state, {payload}) => {
      state.titleIsSave = !state.titleIsSave
    },
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
      const currentCategory = state.listOfSprints.find((item, i) => item.id === payload)
      state.sprintTitleText = currentCategory.sprintTitle
      state.sprintLinks = currentCategory.sprintLinks
      state.currentCategoryId = currentCategory.id
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
    redactedList: (state, {payload}) => {
      state.listOfSprints = state.listOfSprints.map(obj =>
        obj.id === state.currentCategoryId ? {...obj, sprintLinks: payload} : obj
      );
    },
    removeCurrentId: (state, {payload}) => {
      state.currentCategoryId = null
    }
  }
})

export const sprintAction = sprintSlice.actions

export const getTitleIsSave = (state) => state.sprint.titleIsSave
export const getSprintTitleText = (state) => state.sprint.sprintTitleText
export const getSprintLinks = (state) => state.sprint.sprintLinks
export const getListOfSprints = (state) => state.sprint.listOfSprints
export const getCurrentLink = (state) => state.sprint.currentLink
export const getCurrentId = (state) => state.sprint.currentCategoryId
export default sprintSlice

