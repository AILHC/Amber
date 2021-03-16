import World, { Component } from '../Ape'

class Intensity extends Component {}

Intensity.properties = {
  value: 0.5,
  target: null,
}

World.registerComponent(Intensity)

export default Intensity