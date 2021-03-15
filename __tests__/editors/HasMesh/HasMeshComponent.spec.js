import React from 'react'

import { create } from 'react-test-renderer'

import HasMesh from '../../src/editors/HasMesh/HasMeshComponent'

describe('The HasMesh component', () => {
  it('renders correctly', () => {
    const root = create(<HasMesh
    />)
  
    expect(root.toJSON()).toMatchSnapshot()
  })
})