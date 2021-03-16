import {
} from '../../src/creators/Mesh/MeshHocs'

describe('The Mesh Hocs', () => {
  describe('hocs function', () => {
    it('is a higher order function', () => {
      expect(typeof myHoc()).toEqual('function')
    })
  })
})