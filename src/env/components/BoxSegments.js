import World, { Component } from '../Ape'

class BoxSegments extends Component {}

BoxSegments.properties = {
  wide: 0,
  high: 0,
  deep: 0,
  target: null,
}

World.registerComponent(BoxSegments)

export default BoxSegments