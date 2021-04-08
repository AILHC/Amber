import ShadowCaster from './ShadowCaster'

const PointLight = ({ entity }) =>
  <ShadowCaster type="Point" entity={entity} rotates={false} />

export default PointLight
