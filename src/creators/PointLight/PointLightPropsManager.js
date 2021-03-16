import {
  setColor,
  setIntensity,
} from './PointLightSlice'

export const actions = {
  setColor,
  setIntensity,
}

export const localState = globalState => ({
  color:     globalState.PointLight.color,
  intensity: globalState.PointLight.intensity,
})