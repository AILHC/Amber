import { world } from '../../World'

import {
  setRotateX,
  setRotateY,
} from './RotationSlice'

export const actions = {
  setRotateX,
  setRotateY,
}

export const localState = (globalState, passed) => {
  const entity = world.entities.get(passed.entity)

  entity.c.rotation.x = globalState.Rotation.rotateX
  entity.c.rotation.y = globalState.Rotation.rotateY

  return {
    rotateX: globalState.Rotation.rotateX,
    rotateY: globalState.Rotation.rotateY,
  }
}