import { world } from '../../World'

import {
  toggleCastShadow,
  toggleReceiveShadow,
} from './ShadowsSlice'

export const actions = {
  toggleCastShadow,
  toggleReceiveShadow,
}

export const localState = (globalState, passed) => {
  const entity = world.entities.get(passed.entity)

  entity.c.shadows.cast    = globalState.Shadows.cast
  entity.c.shadows.receive = globalState.Shadows.receive

  return {
    cast:    globalState.Shadows.cast,
    receive: globalState.Shadows.receive,
  }
}