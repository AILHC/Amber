import World, { Component } from '../Ape'

class Helpers extends Component {}

Helpers.properties = {
  value: []
}

World.registerComponent(Helpers)

export default Helpers