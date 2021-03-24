import React from 'react'

import Wrapper from '../../helpers/FieldsetWrapper'

import Color         from '../components/Color'
import Intensity     from '../components/Intensity'
import Visibility    from '../components/Visibility'
import CastShadows   from '../components/CastShadows'
import LightRotation from '../components/LightRotation'

const Component = ({ entity }) =>
  <form className="spot-light editor" id={`${entity}-component-editor`}>
    <Wrapper label="Visibility"   child={<Visibility entity={entity}  />} />
    <Wrapper label="Cast Shadows" child={<CastShadows entity={entity} />} />
    <Intensity entity={entity} />
    <LightRotation entity={entity} />
    <Color entity={entity} />
  </form>

export default Component
