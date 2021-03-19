import {
  setId,
  create,
  setSize,
  setColor,
  setMaterial,
  setPosition,
} from './PlaneSlice'

export const actions = {
  setId,
  create,
  setSize,
  setColor,
  setMaterial,
  setPosition,
}

export const localState = globalState => ({
  id: globalState.Plane.id,
  material: globalState.Plane.material,
  color: {
    r: globalState.Plane.r,
    g: globalState.Plane.g,
    b: globalState.Plane.b,
  },
  size: {
    width:  globalState.Plane.width,
    height: globalState.Plane.height,
  },
  position: {
    x: globalState.Plane.x,
    y: globalState.Plane.y,
    z: globalState.Plane.z,
  },
})