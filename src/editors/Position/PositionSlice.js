import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'Position',
  initialState: {
    x: 0,
    y: 0,
    z: 0,
  },
  reducers: {
    setX: (state, { payload }) => ({ ...state, x: parseFloat(payload) }),
    setY: (state, { payload }) => ({ ...state, y: parseFloat(payload) }),
    setZ: (state, { payload }) => ({ ...state, z: parseFloat(payload) }),
  }
})

export const {
  setX,
  setY,
  setZ,
} = slice.actions

export default slice.reducer