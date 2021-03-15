import {
} from '../../src/editors/Shadows/ShadowsHocs'

describe('The Shadows Hocs', () => {
  describe('hocs function', () => {
    it('is a higher order function', () => {
      expect(typeof myHoc()).toEqual('function')
    })
  })
})