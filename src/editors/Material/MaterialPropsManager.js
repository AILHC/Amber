import { world } from '../../World'

import {
  setRed,
  setGreen,
  setBlue,
  setKind,
} from './MaterialSlice'

export const actions = {
  setRed,
  setGreen,
  setBlue,
  setKind,
}

export const localState = (globalState, passed) => {
  const entity = world.entities.get(passed.entity)

  entity.c.material.red = globalState.Material.red
  entity.c.material.green = globalState.Material.green
  entity.c.material.blue = globalState.Material.blue
  
  return {
    kind: globalState.Material.kind,
    red: globalState.Material.red,
    green: globalState.Material.green,
    blue: globalState.Material.blue,
  }
}