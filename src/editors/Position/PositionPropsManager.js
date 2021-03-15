import { world } from '../../World'

import {
  setX,
  setY,
  setZ,
} from './PositionSlice'

export const actions = {
  setX,
  setY,
  setZ,
}

export const localState = (globalState, passed) => {
  const entity = world.entities.get(passed.entity)

  entity.c.position.x = globalState.Position.x
  entity.c.position.y = globalState.Position.y
  entity.c.position.z = globalState.Position.z

  return {
    x: globalState.Position.x,
    y: globalState.Position.y,
    z: globalState.Position.z,
  }
}