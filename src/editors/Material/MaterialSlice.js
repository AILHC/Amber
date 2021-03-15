import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'Material',
  initialState: {
    red: 0,
    green: 1,
    blue: 0,
    kind: 'MeshBasicMaterial'
  },
  reducers: {
    setRed: (state, { payload }) => ({ ...state, red: parseFloat(payload) }),
    setGreen: (state, { payload }) => ({ ...state, green: parseFloat(payload) }),
    setBlue: (state, { payload }) => ({ ...state, blue: parseFloat(payload) }),
    setKind: (state, { payload }) => ({ ...state, kind: payload }),
  }
})

export const {
  setRed,
  setGreen,
  setBlue,
  setKind,
} = slice.actions

export default slice.reducer