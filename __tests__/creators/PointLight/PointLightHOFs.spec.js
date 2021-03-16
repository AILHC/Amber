import {
} from '../../src/creators/PointLight/PointLightHocs'

describe('The PointLight Hocs', () => {
  describe('hocs function', () => {
    it('is a higher order function', () => {
      expect(typeof myHoc()).toEqual('function')
    })
  })
})