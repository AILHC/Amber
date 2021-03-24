import {
  setId,
  create,
  setSize,
  setColor,
  setMaterial,
  setPosition,
  toggleReceiveShadows,
} from './PlaneSlice'

export const actions = {
  setId,
  create,
  setSize,
  setColor,
  setMaterial,
  setPosition,
  toggleReceiveShadows,
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
    width: globalState.Plane.width,
    depth: globalState.Plane.depth,
  },
  position: {
    x: globalState.Plane.x,
    y: globalState.Plane.y,
    z: globalState.Plane.z,
  },
  receiveShadows: globalState.Plane.receiveShadows,
})