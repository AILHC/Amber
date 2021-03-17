import {
 setCurrentEntity
} from './EntityEditorSlice'

export const actions = {
  setCurrentEntity
}

export const localState = globalState => ({
  currentEntity:    globalState.EntityEditor.currentEntity || globalState.EntityEditor.editableEntities[0],
  editableEntities: globalState.EntityEditor.editableEntities
})