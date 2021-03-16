import {
  setSelected
} from './NewEntitySlice'

export const actions = {
  setSelected
}

export const localState = globalState => ({
  options: globalState.NewEntity.options,
  selected: globalState.NewEntity.selected,
})