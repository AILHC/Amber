import World, { Component } from '../Ape'

class BoxSize extends Component {}

BoxSize.properties = {
  width:  0,
  height: 0,
  depth:  0,
  target: null,
}

World.registerComponent(BoxSize)

export default BoxSize