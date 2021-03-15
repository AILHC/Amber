import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'EntityEditor',
  initialState: {
    rotateX: 15.5,
    rotateY: 15.5,
  },
  reducers: {
    setRotateX: (state, { payload }) => ({ ...state, rotateX: parseFloat(payload)}),
    setRotateY: (state, { payload }) => ({ ...state, rotateY: parseFloat(payload)}),
  }
})

export const {
  setRotateX,
  setRotateY,
} = slice.actions

// const {
// } = slice.actions

export default slice.reducer