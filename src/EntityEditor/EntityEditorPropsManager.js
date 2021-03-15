import { box } from '../World'

import {
  setRotateX,
  setRotateY,
} from './EntityEditorSlice'

export const actions = {
  setRotateX,
  setRotateY,
}

export const localState = globalState => {
  box.c.rotation.x = globalState.EntityEditor.rotateX
  box.c.rotation.y = globalState.EntityEditor.rotateY

  return {
    rotateX: globalState.EntityEditor.rotateX,
    rotateY: globalState.EntityEditor.rotateY,
  }
}