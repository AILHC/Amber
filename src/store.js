import { configureStore } from '@reduxjs/toolkit'

import SceneViewReducer from './SceneView/SceneViewSlice'

import EntityEditorReducer from './EntityEditor/EntityEditorSlice'

import NewEntityReducer from './NewEntity/NewEntitySlice'

import SpotLightReducer from './creators/SpotLight/SpotLightSlice'
import PointLightReducer from './creators/PointLight/PointLightSlice'
import DirectionalLightReducer from './creators/DirectionalLight/DirectionalLightSlice'

export default configureStore({
  reducer: {
    SceneView: SceneViewReducer,

    EntityEditor: EntityEditorReducer,

    NewEntity: NewEntityReducer,

    SpotLight:        SpotLightReducer,
    PointLight:       PointLightReducer,
    DirectionalLight: DirectionalLightReducer,
  }
})