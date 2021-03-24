import {
  setId,
  create,
  setColor,
  setRotation,
  setIntensity,
  toggleCastShadows,
  setLookAtPosition,
} from './PointLightSlice'

export const actions = {
  setId,
  create,
  setColor,
  setRotation,
  setIntensity,
  toggleCastShadows,
  setLookAtPosition,
}

export const localState = globalState => ({
  id: globalState.PointLight.id,
  color: {
    r: globalState.PointLight.r,
    g: globalState.PointLight.g,
    b: globalState.PointLight.b,
  },
  rotation: {
    x: globalState.PointLight.x,
    y: globalState.PointLight.y,
    z: globalState.PointLight.z,
  },
  lookAt: {
    x: globalState.PointLight.lookAtX,
    y: globalState.PointLight.lookAtY,
    z: globalState.PointLight.lookAtZ,
  },
  intensity:   globalState.PointLight.intensity,
  castShadows: globalState.PointLight.castShadows,
})