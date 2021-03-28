import World from './Ape'

import C from './components'
import S from './systems'

export default World

export const Components = C
export const Systems    = S

export const EntitiesByEcsId = {
  // Key: Ecs Id
  // Value: Editor Id
}

export const EntitiesByEditorId = {
  // Key: Editor Id
  // Value: Ecs Id
}

let entityAddedCallback
let entityRemovedCallback
let entityRenamedCallback

export const EntityAdded   = cb => entityAddedCallback   = cb
export const EntityRemoved = cb => entityRemovedCallback = cb
export const EntityRenamed = cb => entityRenamedCallback = cb

export const RegisterEntity = ({ EcsId, EditorId }) => {
  EntitiesByEcsId[EcsId]       = EditorId
  EntitiesByEditorId[EditorId] = EcsId

  entityAddedCallback({ EcsId, EditorId })
}

export const RenameEntity = ({ EcsId, EditorId }) => {
  const oldEditorId = EntitiesByEcsId[EcsId]

  EntitiesByEditorId[oldEditorId] = undefined

  EntitiesByEcsId[EcsId]       = EditorId
  EntitiesByEditorId[EditorId] = EcsId

  entityRenamedCallback({ EcsId, EditorId: { old: oldEditorId, current: EditorId }})
}

export const RemoveEntity = ({ EcsId, EditorId }) => {
  if (EcsId) {
    const eid = EntitiesByEcsId[EcsId]

    EntitiesByEcsId[EcsId]   = undefined
    EntitiesByEditorId[eid]  = undefined

    World.getEntity(EcsId).destroy()

    entityRemovedCallback({ EcsId, EditorId: eid })
  }
  else if (EditorId) {
    const eid = EntitiesByEditorId[EditorId]

    EntitiesByEcsId[eid]         = undefined
    EntitiesByEditorId[EditorId] = undefined

    World.getEntity(eid).destroy()

    entityRemovedCallback({ EcsId: eid, EditorId })
  }
}


const frame = World.createEntity({
  id: 'frame',
  c: {
    time: {
      type: 'CurrentFrame',
    }
  }
})

let epoch = Date.now(), lastFrame = epoch

const { time } = frame.c

const loop = t => {
  const delta = t - lastFrame

  time.update({
    epoch,
    time: t,
    deltaTime: delta,
    deltaFrame: delta / 16.667
  })

  World.runSystems('frame')

  lastFrame = t

  requestAnimationFrame(loop)
}

loop(lastFrame)