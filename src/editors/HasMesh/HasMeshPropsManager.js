import { world } from '../../World'

import {
} from './HasMeshSlice'

export const actions = {
}

export const localState = (globalState, passed) => {
  const entity = world.entities.get(passed.entity)

  const {
    visible,
    castShadow,
    receiveShadow,
  } = entity.c.mesh.mesh

  return {
    visible,
    castShadow,
    receiveShadow,
  }
}