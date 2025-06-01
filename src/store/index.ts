import {configureStore} from '@reduxjs/toolkit'
import modalReducer from './modalSlice'
import loadingSlice from './loadingDataSlice'

const store = configureStore({
  reducer: {
    modal: modalReducer,
    loading: loadingSlice
  }
})

export default store
