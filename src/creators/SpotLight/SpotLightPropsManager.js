import {
  setId,
  create,
  setColor,
  setRotation,
  setIntensity,
  toggleCastShadows,
  setLookAtPosition,
} from './SpotLightSlice'

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
  id: globalState.SpotLight.id,
  color: {
    r: globalState.SpotLight.r,
    g: globalState.SpotLight.g,
    b: globalState.SpotLight.b,
  },
  rotation: {
    x: globalState.SpotLight.x,
    y: globalState.SpotLight.y,
    z: globalState.SpotLight.z,
  },
  lookAt: {
    x: globalState.SpotLight.lookAtX,
    y: globalState.SpotLight.lookAtY,
    z: globalState.SpotLight.lookAtZ,
  },
  intensity:   globalState.SpotLight.intensity,
  castShadows: globalState.SpotLight.castShadows,
})