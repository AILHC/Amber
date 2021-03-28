import MeshBox   from './Meshes/Box'
import MeshPlane from './Meshes/Plane'

import SpotLight        from './Lights/Spot'
import PointLight       from './Lights/Point'
import AmbientLight     from './Lights/Ambient'
import HemisphereLight  from './Lights/Hemisphere'
import DirectionalLight from './Lights/Directional'

const Creators = {
  MeshBox,
  MeshPlane,

  SpotLight,
  PointLight,
  AmbientLight,
  HemisphereLight,
  DirectionalLight,
}

export default Creators

export const options = [{
  label: 'Lights',
  options: [{
    label: 'Ambient',
    value: 'Creator:AmbientLight',
  }, {
    label: 'Hemisphere',
    value: 'Creator:HemisphereLight',
  }, {
    label: 'Directional',
    value: 'Creator:DirectionalLight',
  }, {
    label: 'Spot',
    value: 'Creator:SpotLight',
  }, {
    label: 'Point',
    value: 'Creator:PointLight',
  }]
}, {
  label: 'Meshes',
  options: [{
    label: 'Box',
    value: 'Creator:MeshBox',
  }, {
    label: 'Plane',
    value: 'Creator:MeshPlane',
  }]
}]