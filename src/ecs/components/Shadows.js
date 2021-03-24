import World, { Component } from '../Ape'

class Shadows extends Component {}

Shadows.properties = {
  cast:    false,
  receive: false,
  target: null,
}

World.registerComponent(Shadows)

export default Shadows