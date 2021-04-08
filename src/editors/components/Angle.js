import LightProperty from './LightProperty'

const Angle = ({
  type,
  entity,
}) =>
  <LightProperty name="Angle" type={type} entity={entity} modifier={Math.PI * .5} />

export default Angle
