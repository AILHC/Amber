import { createSlice } from '@reduxjs/toolkit'

// import * as THREE from 'three'

// console.log(THREE.DirectionalLight)

const slice = createSlice({
  name: 'NewEntity',
  initialState: {
    options: [
      'SpotLight',
      'PointLight',
      'DirectionalLight',

      'Mesh',

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