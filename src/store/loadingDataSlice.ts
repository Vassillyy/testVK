import {createSlice} from '@reduxjs/toolkit'

type LoadingState = {
  isLoading: boolean
}

const initialState: LoadingState = {
  isLoading: false
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading: (state: LoadingState) => {
      state.isLoading = true
    },
    stopLoading: (state: LoadingState) => {
      state.isLoading = false
    }
  }
})

export const {startLoading, stopLoading} = loadingSlice.actions
export default loadingSlice.reducer
