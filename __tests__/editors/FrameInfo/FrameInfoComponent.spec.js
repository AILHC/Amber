import React from 'react'

import { create } from 'react-test-renderer'

import FrameInfo from '../../src/editors/FrameInfo/FrameInfoComponent'

describe('The FrameInfo component', () => {
  it('renders correctly', () => {
    const root = create(<FrameInfo
    />)
  
    expect(root.toJSON()).toMatchSnapshot()
  })
})