import {configureStore} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import uiSlice from "./ui_slice";
import sprintSlice from "./sprint_slice";

const persistUiConfig = {
  key: 'ui',
  storage,
  whitelist: ['titleInput', 'sprintForm']
}
const persistSprintConfig = {
  key: 'sprint',
  storage,
  whitelist: ['sprintTitleText', 'sprintLinks','listOfSprints','currentCategoryIndex']
}

const UiReducer = persistReducer(persistUiConfig, uiSlice.reducer);
const SprintReducer = persistReducer(persistSprintConfig, sprintSlice.reducer);
const store = configureStore({
  reducer: {
    ui: UiReducer,
    sprint: SprintReducer

  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
let persistor = persistStore(store);
export {store, persistor};