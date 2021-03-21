import React from 'react'

import './styles/app.css'
import './styles/forms.css'

import { Provider } from 'react-redux'

import store from './store'

import SceneView from './SceneView/SceneViewComponent'

import EntityEditor from './EntityEditor/EntityEditorContainer'

import NewEntity from './NewEntity/NewEntityContainer'

import './ecs'

const App = () =>
  <Provider store={store}>
    <div className="container-fluid">
      <div className="row flex-grow-1">
        <div className="left pane col-2">
          <EntityEditor />
        </div>
        <div className="center pane col-8 g-0">
          <SceneView />
        </div>
        <div className="right pane col-2">
          <NewEntity />
        </div>
      </div>
    </div>
  </Provider>

export default App

