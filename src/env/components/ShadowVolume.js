import World, { Component } from '../Ape'

class ShadowVolume extends Component {}

ShadowVolume.properties = {
  width:  0,
  height: 0,
  depth:  0,
  target: null,
}

World.registerComponent(ShadowVolume)

export default ShadowVolume