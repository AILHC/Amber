import { world } from '../../World'

import {
} from './FrameInfoSlice'

export const actions = {
}

export const localState = (globalState, passed) => {
  const entity = world.entities.get(passed.entity)

  console.log(entity)

  const {
    time,
    deltaTime,
    deltaFrame,
  } = entity.c.time

  return {
    time,
    deltaTime,
    deltaFrame,
  }
}