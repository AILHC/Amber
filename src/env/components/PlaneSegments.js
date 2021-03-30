import World, { Component } from '../Ape'

class PlaneSegments extends Component {}

PlaneSegments.properties = {
  wide: 0,
  high: 0,
  target: null,
}

World.registerComponent(PlaneSegments)

export default PlaneSegments