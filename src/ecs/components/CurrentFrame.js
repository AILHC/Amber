import World, { Component } from '../Ape'

class CurrentFrame extends Component {}

CurrentFrame.properties = {
  deltaTime: 0,
  deltaFrame: 0,
  time: 0,
  epoch: 0,
  target: null,
}

World.registerComponent(CurrentFrame)

export default CurrentFrame