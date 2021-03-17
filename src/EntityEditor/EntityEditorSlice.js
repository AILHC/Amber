import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'EntityEditor',
  initialState: {
    currentEntity: undefined,
    editableEntities: [],
  },
  reducers: {
    setCurrentEntity:  (state, { payload }) => ({ ...state, currentEntity: payload }),
    addEditableEntity: (state, { payload }) => ({ ...state, editableEntities: [...state.editableEntities, payload] }),
  }
})

export const {
  setCurrentEntity
} = slice.actions

const {
  addEditableEntity
} = slice.actions

export default slice.reducer

export const registerEditableEntity = id => dispatch =>
  dispatch(addEditableEntity(id))