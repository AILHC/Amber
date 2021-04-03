import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
} from 'three'

import { OrbitControls     } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'

import World from './Ape'

import C from './components'
import S from './systems'

import Editors from '../editors/composites'

export default World

let instances = {}

Object.keys(Editors).forEach(e => instances[e] = 0)

const uniqueName = type => `${type} ${instances[type.replace(/\s+/g, '')]++}`

const autoName = (type, entity) =>
  RenameEntity({ EcsId: entity, EditorId: uniqueName(type) })

const width  = window.innerWidth - 280
const height = window.innerHeight

const canvas    = document.getElementById('graphics-context')
const camera    = new PerspectiveCamera(75, width / height, 0.1, 1000)
const renderer  = new WebGLRenderer({ canvas, antialias: true })
const orbit     = new OrbitControls(camera, canvas)
const transform = new TransformControls(camera, canvas)

export const autoNameIfPlaceholder = (type, entity) => {
  if (EntitiesByEcsId[entity] === EditorPlacehodlerId)
    autoName(type, entity)
}

export const Components = C
export const Systems    = S

export const scene     = new Scene()
export const helpers = {
  transform,
  orbit,
}

let translateCallback, rotateCallback, scaleCallback

export const onTranslate = cb => translateCallback = cb
export const onRotate    = cb => rotateCallback    = cb
export const onScale     = cb => scaleCallback     = cb

transform.enabled = false

transform.addEventListener('dragging-changed', e =>
  orbit.enabled = !e.value
)

transform.addEventListener('dragging-changed', e => {
  if (e.value === false)
    switch (e.target.mode) {
      case 'translate': return translateCallback (e.target.object.position)
      case 'rotate':    return rotateCallback    (e.target.object.rotation)
      case 'scale':     return scaleCallback     (e.target.object.scale   )
    }
})

scene.add(helpers.transform)

orbit.target.set(0, 0, 0)
orbit.update()

renderer.shadowMap.enabled = true

camera.position.z = 5

renderer.setSize(width, height)

export const EntitiesByEcsId = {
  // Key: Ecs Id
  // Value: Editor Id
}

export const EntitiesByEditorId = {
  // Key: Editor Id
  // Value: Ecs Id
}

export const SceneElementsByEditorId = {
  // Key: Editor Id
  // Value: Scene uuid
}

let entityAddedCallback    = () => {}
let entityRemovedCallback  = () => {}
let entityRenamedCallbacks = {}

export const EntityAdded   = cb => entityAddedCallback   = cb
export const EntityRemoved = cb => entityRemovedCallback = cb
export const EntityRenamed = (id, cb) => {
  if (Array.isArray(entityRenamedCallbacks[id]))
    entityRenamedCallbacks[id].push(cb)
  else
    entityRenamedCallbacks[id] = [cb]
}

export const EditorPlacehodlerId = '__PLACEHOLDER__'

export const RegisterEntity = ({ EcsId, SceneId }) => {
  EntitiesByEcsId         [EcsId]               = EditorPlacehodlerId
  EntitiesByEditorId      [EditorPlacehodlerId] = EcsId
  SceneElementsByEditorId [EditorPlacehodlerId] = SceneId

  entityAddedCallback({ EcsId, SceneId })
}

export const RenameEntity = ({ EcsId, EditorId }) => {
  const oldEditorId = EntitiesByEcsId         [EcsId]
  const sceneId     = SceneElementsByEditorId [oldEditorId]

  EntitiesByEditorId      [oldEditorId] = undefined
  SceneElementsByEditorId [oldEditorId] = undefined

  EntitiesByEcsId         [EcsId]    = EditorId
  EntitiesByEditorId      [EditorId] = EcsId
  SceneElementsByEditorId [EditorId] = sceneId

  for (const cb of entityRenamedCallbacks[EcsId])
    cb({ EcsId, SceneId: sceneId, EditorId: { old: oldEditorId, current: EditorId }})
}

const removeFromScene = uuid => {
  const obj = scene.getObjectByProperty('uuid', uuid)

  if (obj) {
    for (const child of obj.children) {
      if (child.geometry) child.geometry.dispose()
      if (child.material) child.material.dispose()

      scene.remove(child)
    }

    scene.remove(obj)
  }
}

export const RemoveEntity = ({ EcsId, EditorId }) => {
  if (EcsId) {
    const edId = EntitiesByEcsId         [EcsId]
    const uuid = SceneElementsByEditorId [edId]

    removeFromScene(uuid)

    EntitiesByEcsId         [EcsId] = undefined
    EntitiesByEditorId      [edId]  = undefined
    SceneElementsByEditorId [edId]  = undefined

    World.getEntity(EcsId).destroy()

    entityRemovedCallback({ EcsId, SceneId: uuid, EditorId: edId })
  }
  else if (EditorId) {
    const ecsId  = EntitiesByEditorId      [EditorId]
    const uuid   = SceneElementsByEditorId [EditorId]
    
    if (ecsId) {
      removeFromScene(uuid)

      EntitiesByEcsId         [ecsId]    = undefined
      EntitiesByEditorId      [EditorId] = undefined
      SceneElementsByEditorId [EditorId] = undefined

      World.getEntity(ecsId).destroy()

      entityRemovedCallback({ EcsId: ecsId, SceneId: uuid, EditorId })
    }
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
}

export const render = () => {
  loop()

  renderer.render(scene, camera)

  requestAnimationFrame(render)
}

const onWindowResize = () => {
  const width  = window.innerWidth - 280
  const height = window.innerHeight
  const aspect = width / height

  camera.aspect = aspect
  camera.updateProjectionMatrix()

  renderer.setSize(width, height)
}

window.addEventListener('resize', onWindowResize)

render()