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
  color:     globalState.DirectionalLight.color,
  intensity: globalState.DirectionalLight.intensity,
})