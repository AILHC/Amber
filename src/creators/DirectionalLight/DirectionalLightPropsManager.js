import {
  create,
  setColor,
  setIntensity,
} from './DirectionalLightSlice'

export const actions = {
  create,
  setColor,
  setIntensity,
}

export const localState = globalState => ({
  color: {
    r: globalState.DirectionalLight.r,
    g: globalState.DirectionalLight.g,
    b: globalState.DirectionalLight.b,
  },
  intensity: globalState.DirectionalLight.intensity,
})