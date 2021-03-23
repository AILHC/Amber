import {
  setId,
  create,
  setColor,
  setRotation,
  setIntensity,
  setLookAtPosition,
} from './DirectionalLightSlice'

export const actions = {
  setId,
  create,
  setColor,
  setRotation,
  setIntensity,
  setLookAtPosition,
}

export const localState = globalState => ({
  id: globalState.DirectionalLight.id,
  color: {
    r: globalState.DirectionalLight.r,
    g: globalState.DirectionalLight.g,
    b: globalState.DirectionalLight.b,
  },
  rotation: {
    x: globalState.DirectionalLight.x,
    y: globalState.DirectionalLight.y,
    z: globalState.DirectionalLight.z,
  },
  lookAt: {
    x: globalState.DirectionalLight.lookAtX,
    y: globalState.DirectionalLight.lookAtY,
    z: globalState.DirectionalLight.lookAtZ,
  },
  intensity: globalState.DirectionalLight.intensity,
})