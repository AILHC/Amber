import World, { Component } from '../Ape'

class ReceiveShadows extends Component {}

ReceiveShadows.properties = {
  value: false,
  target: null,
}

World.registerComponent(ReceiveShadows)

export default ReceiveShadows