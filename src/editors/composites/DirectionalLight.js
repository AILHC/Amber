import React from 'react'

import Wrapper from '../../helpers/FieldsetWrapper'

import Color         from '../components/Color'
import Intensity     from '../components/Intensity'
import Visibility    from '../components/Visibility'
import LightRotation from '../components/LightRotation'

const Component = ({ entity }) =>
  <form className="box editor" id={`${entity}-component-editor`}>
    <Wrapper name="Visibility" child={<Visibility entity={entity} />} />
    <Intensity entity={entity} />
    <LightRotation entity={entity} />
    <Color entity={entity} />
  </form>

export default Component
