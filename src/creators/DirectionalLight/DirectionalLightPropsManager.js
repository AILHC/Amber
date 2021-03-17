import {
  setId,
  create,
  setColor,
  setIntensity,
} from './DirectionalLightSlice'

export const actions = {
  setId,
  create,
  setColor,
  setIntensity,
}

export const localState = globalState => ({
  id: globalState.DirectionalLight.id,
  color: {
    r: globalState.DirectionalLight.r,
    g: globalState.DirectionalLight.g,
    b: globalState.DirectionalLight.b,
  },
  intensity: globalState.DirectionalLight.intensity,
})