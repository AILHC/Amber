import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'SpotLight',
  initialState: {
    color: '#fff',
    intensity: 1,
  },
  reducers: {
    setColor:     (state, { payload }) => ({ ...state, color:     payload.hex }),
    setIntensity: (state, { payload }) => ({ ...state, intensity: payload     }),
  }
})

export const {
  setColor,
  setIntensity
} = slice.actions

export default slice.reducer