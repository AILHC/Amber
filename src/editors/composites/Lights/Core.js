import React, { useEffect } from 'react'

import { reset } from '../../../env'

import { cssify } from '../../../ui/helpers'

import Wrapper from '../../../helpers/FieldsetWrapper'

import Name       from '../../components/Name'
import Color      from '../../components/Color'
import Position   from '../../components/Position'
import Rotation   from '../../components/Rotation'
import Intensity  from '../../components/Intensity'
import Visibility from '../../components/Visibility'

import { manageHelperVisibility } from './helpers'

const CoreLight = ({
  type,
  entity,
  children,
  color = {},
  rotates = true,
  includeColor = true,
}) => {
  useEffect(() => reset())
  useEffect(manageHelperVisibility(entity))

  return <form
    onSubmit={e => e.preventDefault()}
    id={`${cssify(entity)}-component-editor`}
    className={`${cssify(type)}-light editor`}
  >
    <h3>General</h3>
    <Name entity={entity} />
    <Wrapper label="Visible" child={<Visibility entity={entity} />} />
    <Intensity entity={entity} type={`${type}Light`} />
    {includeColor && <Color entity={entity} {...color} type={`${type}Light`} />}
    <div className="section-boundary" />
    <h3>Coords</h3>
    <Position entity={entity} type={`${type}Light`} />
    {rotates && <Rotation entity={entity} type={`${type}Light`} />}
    {children}
  </form>
}

export default CoreLight
