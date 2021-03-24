import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'NewEntity',
  initialState: {
    options: [
      'SpotLight',
      'PointLight',
      'DirectionalLight',

      'Box',
      'Plane',
    ],
    selected: undefined,
  },
  reducers: {
    setSelected: (state, { payload }) => ({ ...state, selected: payload })
  }
})

export const {
  setSelected
} = slice.actions

export default slice.reducer