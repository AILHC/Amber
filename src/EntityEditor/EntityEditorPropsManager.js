import World from '../ecs/Ape'

import {
  setCurrentEntity
} from './EntityEditorSlice'

export const actions = {
  setCurrentEntity
}

export const localState = globalState => {
  let options = []

  for (const key of World.entities)
    options.push(key[0])

  const currentEntity = World.getEntity(globalState.EntityEditor.currentEntity)
  const keys = Object.keys(currentEntity.types)

  const currentComponents = keys.map(k => ({ name: k, ...currentEntity.types[k].values().next().value }))

  return {
    options,
    currentEntity,
    currentComponents,
  }
}