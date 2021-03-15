import { configureStore } from '@reduxjs/toolkit'

import SceneViewReducer from './SceneView/SceneViewSlice'
import EntityEditorReducer from './EntityEditor/EntityEditorSlice'

import RotationReducer from './editors/Rotation/RotationSlice'
import PositionReducer from './editors/Position/PositionSlice'

export default configureStore({
  reducer: {
    Position: PositionReducer,
    Rotation: RotationReducer,
    SceneView: SceneViewReducer,
    EntityEditor: EntityEditorReducer,
  }
})