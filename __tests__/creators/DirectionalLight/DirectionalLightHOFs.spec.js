import {
} from '../../src/creators/DirectionalLight/DirectionalLightHocs'

describe('The DirectionalLight Hocs', () => {
  describe('hocs function', () => {
    it('is a higher order function', () => {
      expect(typeof myHoc()).toEqual('function')
    })
  })
})