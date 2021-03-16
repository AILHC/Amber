import React from 'react'

import { create } from 'react-test-renderer'

import Mesh from '../../src/creators/Mesh/MeshComponent'

describe('The Mesh component', () => {
  it('renders correctly', () => {
    const root = create(<Mesh
    />)
  
    expect(root.toJSON()).toMatchSnapshot()
  })
})