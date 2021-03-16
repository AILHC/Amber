import {
} from '../../src/creators/SpotLight/SpotLightHocs'

describe('The SpotLight Hocs', () => {
  describe('hocs function', () => {
    it('is a higher order function', () => {
      expect(typeof myHoc()).toEqual('function')
    })
  })
})