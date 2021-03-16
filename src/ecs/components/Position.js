import World, { Component } from '../Ape'

class Position extends Component {}

Position.properties = {
  x: 0,
  y: 0,
  z: 0,
  target: null,
}

World.registerComponent(Position)

export default Position