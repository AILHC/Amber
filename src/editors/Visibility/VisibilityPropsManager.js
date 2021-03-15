import { world } from '../../World'

import {
  toggleVisible
} from './VisibilitySlice'

export const actions = {
  toggleVisible
}

export const localState = (globalState, passed) => {
  const entity = world.entities.get(passed.entity)

  entity.c.visibility.visible = globalState.Visibility.visible

  return {
    visible: globalState.Visibility.visible
  }
}