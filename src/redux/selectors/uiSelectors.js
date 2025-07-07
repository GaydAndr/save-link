// src/redux/selectors/uiSelectors.js
import { createSelector } from 'reselect';

const selectUiState = state => state.ui;

export const getIsWordListFormVisible = createSelector(
  [selectUiState],
  state => state.isWordListFormVisible
);

export const getAreWordListsVisible = createSelector(
  [selectUiState],
  state => state.areWordListsVisible
);

export const getModalType = createSelector(
  [selectUiState],
  state => state.modal
);

export const getIsListNameInputVisible = createSelector(
  [selectUiState],
  state => state.isListNameInputVisible
);

export const getIsCancelEditBtnVisible = createSelector(
  [selectUiState],
  state => state.isCancelEditBtnVisible
);

export const getActiveEditingListId = createSelector(
  [selectUiState],
  state => state.activeEditingListId
);