import {
} from '../src/SceneView/SceneViewHocs'

describe('The SceneView Hocs', () => {
  describe('hocs function', () => {
    it('is a higher order function', () => {
      expect(typeof myHoc()).toEqual('function')
    })
  })
})