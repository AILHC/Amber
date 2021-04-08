import World from '../../../env'

const helpersVisible = (entity, visible) => {
  const v = World.getEntity(entity)?.c?.helpers?.value
  
  if (v)
    for (const h of v)
      h.visible = visible
}

export const manageHelperVisibility = entity => () => {
  helpersVisible(entity, true)

  return () => helpersVisible(entity, false)
}