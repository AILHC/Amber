import { configureStore } from '@reduxjs/toolkit'

import SceneViewReducer from './SceneView/SceneViewSlice'
import EntityEditorReducer from './EntityEditor/EntityEditorSlice'

export default configureStore({
  reducer: {
    SceneView: SceneViewReducer,
    EntityEditor: EntityEditorReducer,
  }
})