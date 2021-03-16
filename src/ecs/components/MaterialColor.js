import World, { Component } from '../Ape'

class MaterialColor extends Component {}

MaterialColor.properties = {
  r: 0,
  g: 1,
  b: 0,
  target: null,
}

World.registerComponent(MaterialColor)

export default MaterialColor