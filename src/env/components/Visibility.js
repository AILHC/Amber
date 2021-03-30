import World, { Component } from '../Ape'

class Visibility extends Component {}

Visibility.properties = {
  value: true,
  target: null,
}

World.registerComponent(Visibility)

export default Visibility