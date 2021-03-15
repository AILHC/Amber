import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'Shadows',
  initialState: {
    castShadow: true,
    receiveShadow: true,
  },
  reducers: {
    toggleCastShadow:    state => ({ ...state, castShadow:    !state.castShadow    }),
    toggleReceiveShadow: state => ({ ...state, receiveShadow: !state.receiveShadow }),
  }
})

export const {
  toggleCastShadow,
  toggleReceiveShadow,
} = slice.actions

export default slice.reducer