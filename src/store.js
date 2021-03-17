import { configureStore } from '@reduxjs/toolkit'

import EntityEditorReducer from './EntityEditor/EntityEditorSlice'

import NewEntityReducer from './NewEntity/NewEntitySlice'

import BoxReducer from './creators/Box/BoxSlice'
import SpotLightReducer from './creators/SpotLight/SpotLightSlice'
import PointLightReducer from './creators/PointLight/PointLightSlice'
import DirectionalLightReducer from './creators/DirectionalLight/DirectionalLightSlice'

export default configureStore({
  reducer: {
    EntityEditor: EntityEditorReducer,

    NewEntity: NewEntityReducer,

    Box: BoxReducer,

    SpotLight:        SpotLightReducer,
    PointLight:       PointLightReducer,
    DirectionalLight: DirectionalLightReducer,
  }
})