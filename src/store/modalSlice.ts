import {createSlice} from '@reduxjs/toolkit'

type ModalState = {
  open: boolean
}

const initialState: ModalState = {
  open: false
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state: ModalState) => {
      state.open = true
    },
    closeModal: (state: ModalState) => {
      state.open = false
    }
  }
})

export const {openModal, closeModal} = modalSlice.actions
export default modalSlice.reducer
