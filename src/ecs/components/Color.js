import World, { Component } from '../Ape'

class Color extends Component {}

Color.properties = {
  r: 0,
  g: 1,
  b: 0,
  target: null,
}

World.registerComponent(Color)

export default Color