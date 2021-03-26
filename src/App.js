import React from 'react'

import './styles/app.css'
import './styles/forms.css'

import SceneView from './SceneView/SceneViewComponent'

import EntityEditor  from './editors/Entity'
import EntityCreator from './creators/Entity'

import './ecs'

const App = () =>
  <div className="container-fluid">
    <div className="row flex-grow-1">
      <div className="left pane col-2">
        <EntityEditor />
      </div>
      <div className="center pane col-8 g-0">
        <SceneView />
      </div>
      <div className="right pane col-2">
        <EntityCreator />
      </div>
    </div>
  </div>

export default App

