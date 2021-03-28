import World, { Component } from '../Ape'

class Wireframe extends Component {}

Wireframe.properties = {
  target: {}
}

World.registerComponent(Wireframe)

export default Wireframe