import React from 'react'

import Wrapper from '../../../helpers/FieldsetWrapper'

import CastShadows from '../../components/CastShadows'

import Light from './Core'

const Component = ({ type, entity, fields, children }) =>
  <Light type={type} entity={entity}>
    <div className="section-boundary" />
    <h3>Shadows</h3>
    <Wrapper label="Cast" child={<CastShadows entity={entity} type={`${type}Light`} />} />
    {fields}
    <div className="section-boundary" />
    {children}
  </Light>

export default Component
