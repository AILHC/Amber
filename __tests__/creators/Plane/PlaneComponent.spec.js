import React from 'react'

import { create } from 'react-test-renderer'

import Plane from '../../src/creators/Plane/PlaneComponent'

describe('The Plane component', () => {
  it('renders correctly', () => {
    const root = create(<Plane
    />)
  
    expect(root.toJSON()).toMatchSnapshot()
  })
})