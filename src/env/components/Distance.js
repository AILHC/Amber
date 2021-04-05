import World, { Component } from '../Ape'

class Distance extends Component {}

Distance.properties = {
  value: 1,
  target: null,
}

World.registerComponent(Distance)

export default Distance