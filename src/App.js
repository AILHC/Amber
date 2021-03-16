import React from 'react'

import './App.css'

import { Provider } from 'react-redux'

import store from './store'

import SceneView from './SceneView/SceneViewContainer'

import EntityEditor from './EntityEditor/EntityEditorContainer'

import NewEntity from './NewEntity/NewEntityContainer'

import './ecs/core'

const App = () =>
  <Provider store={store}>
    <div className="container-fluid">
      <div className="row">
        <div className="left pane col-2">
          <EntityEditor />
        </div>
        <div className="center pane col-8">
          <SceneView />
        </div>
        <div className="right pane col-2">
          <NewEntity />
        </div>
      </div>
    </div>
  </Provider>

export default App

