import World, { Component } from '../Ape'

class Decay extends Component {}

Decay.properties = {
  value:  0,
  target: null,
}

World.registerComponent(Decay)

export default Decay