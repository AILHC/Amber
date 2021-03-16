import React from 'react'

import { create } from 'react-test-renderer'

import NewEntity from '../src/NewEntity/NewEntityComponent'

describe('The NewEntity component', () => {
  it('renders correctly', () => {
    const root = create(<NewEntity
    />)
  
    expect(root.toJSON()).toMatchSnapshot()
  })
})