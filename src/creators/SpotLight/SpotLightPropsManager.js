import {
  setColor,
  setIntensity,
} from './SpotLightSlice'

export const actions = {
  setColor,
  setIntensity,
}

export const localState = globalState => ({
  color:     globalState.SpotLight.color,
  intensity: globalState.SpotLight.intensity,
})