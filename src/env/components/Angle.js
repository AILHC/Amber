import World, { Component } from '../Ape'

class Angle extends Component {}

Angle.properties = {
  value: Math.PI * .5,
  target: null,
}

World.registerComponent(Angle)

export default Angle