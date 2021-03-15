import { configureStore } from '@reduxjs/toolkit'

import SceneViewReducer from './SceneView/SceneViewSlice'

import EntityEditorReducer from './EntityEditor/EntityEditorSlice'

import ShadowsReducer    from './editors/Shadows/ShadowsSlice'
import HasMeshReducer    from './editors/HasMesh/HasMeshSlice'
import RotationReducer   from './editors/Rotation/RotationSlice'
import PositionReducer   from './editors/Position/PositionSlice'
import MaterialReducer   from './editors/Material/MaterialSlice'
import VisibilityReducer from './editors/Visibility/VisibilitySlice'

export default configureStore({
  reducer: {
    Shadows:    ShadowsReducer,
    HasMesh:    HasMeshReducer,
    Position:   PositionReducer,
    Rotation:   RotationReducer,
    Material:   MaterialReducer,
    Visibility: VisibilityReducer,

    SceneView: SceneViewReducer,

    EntityEditor: EntityEditorReducer,
  }
})