import React from 'react'

import { create } from 'react-test-renderer'

import EntityEditor from '../src/EntityEditor/EntityEditorComponent'

describe('The EntityEditor component', () => {
  it('renders correctly', () => {
    const root = create(<EntityEditor
    />)
  
    expect(root.toJSON()).toMatchSnapshot()
  })
})