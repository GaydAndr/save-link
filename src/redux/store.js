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
import wordListSlice from "./wordList_slice";

const persistUiConfig = {
  key: 'ui',
  storage,
  whitelist: ['titleInput', 'sprintForm']
}
const persistWordListsConfig = {
  key: 'wordLists',
  storage,
  whitelist: ['wordLists']
}

const UiReducer = persistReducer(persistUiConfig, uiSlice.reducer);
const WordListsReducer  = persistReducer(persistWordListsConfig, wordListSlice.reducer);
const store = configureStore({
  reducer: {
    ui: UiReducer,
    wordLists: WordListsReducer

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