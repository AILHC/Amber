import React from 'react'

import { cssify } from '../../../ui/helpers'

import Wrapper from '../../../helpers/FieldsetWrapper'

import Color      from '../../components/Color'
import Intensity  from '../../components/Intensity'
import Visibility from '../../components/Visibility'

const Component = ({
  type,
  entity,
  children,
  color = {},
}) =>
  <form className={`${cssify(type)}-light editor`} id={`${cssify(entity)}-component-editor`}>
    <Wrapper label="Visible" child={<Visibility entity={entity}  />} />

    <Intensity entity={entity} />

    <Color entity={entity} {...color} />

    {children}
  </form>

export default Component
