// Link.react.test.js
import React from 'react'
import renderer from 'react-test-renderer'
import MasterLayout from './MasterLayout'

test('Component Master Layout', () => {
    const component = renderer.create(<MasterLayout />)
});
