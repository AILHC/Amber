import {
  create,
  setSize,
  setColor,
  setMaterial,
  setPosition,
} from './BoxSlice'

export const actions = {
  create,
  setSize,
  setColor,
  setMaterial,
  setPosition,
}

export const localState = globalState => ({
  color:    globalState.Box.color,
  material: globalState.Box.material,
  size:     {
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