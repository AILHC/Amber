import React from 'react'

import { cssify } from '../../../ui/helpers'

import Wrapper from '../../../helpers/FieldsetWrapper'

import Name       from '../../components/Name'
import Color      from '../../components/Color'
import Intensity  from '../../components/Intensity'
import Visibility from '../../components/Visibility'

const Component = ({
  type,
  entity,
  children,
  color = {},
  includeColor = true,
}) =>
  <form
    onSubmit={e => e.preventDefault()}
    id={`${cssify(entity)}-component-editor`}
    className={`${cssify(type)}-light editor`}
  >
    <h3>General</h3>
    <Name entity={entity} />
    <Wrapper label="Visible" child={<Visibility entity={entity} />} />
    <Intensity entity={entity} type={`${type}Light`} />
    {includeColor && <Color entity={entity} {...color} type={`${type}Light`} />}
    {children}
  </form>

export default Component
