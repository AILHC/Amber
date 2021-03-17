import {
  setId,
  create,
  setSize,
  setColor,
  setMaterial,
  setPosition,
} from './BoxSlice'

export const actions = {
  setId,
  create,
  setSize,
  setColor,
  setMaterial,
  setPosition,
}

export const localState = globalState => ({
  id: globalState.Box.id,
  material: globalState.Box.material,
  color: {
    r: globalState.Box.r,
    g: globalState.Box.g,
    b: globalState.Box.b,
  },
  size: {
    width:  globalState.Box.width,
    height: globalState.Box.height,
    depth:  globalState.Box.depth,
  },
  position: {
    x: globalState.Box.x,
    y: globalState.Box.y,
    z: globalState.Box.z,
  },
})