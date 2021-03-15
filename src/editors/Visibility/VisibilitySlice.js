import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'Visibility',
  initialState: {
    visible: true,
  },
  reducers: {
    toggleVisible: state => ({ visible: !state.visible }),
  }
})

export const {
  toggleVisible
} = slice.actions

export default slice.reducer