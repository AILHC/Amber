import World, { Component } from '../Ape'

class Rotation extends Component {}

Rotation.properties = {
  x: 0,
  y: 0,
  z: 0,
  target: null,
}

World.registerComponent(Rotation)

export default Rotation