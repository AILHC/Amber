import World, { Component } from '../Ape'

class PlaneSize extends Component {}

PlaneSize.properties = {
  width:  0,
  height: 0,
  target: null,
}

World.registerComponent(PlaneSize)

export default PlaneSize