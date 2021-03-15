import {
} from '../src/EntityEditor/EntityEditorHocs'

describe('The EntityEditor Hocs', () => {
  describe('hocs function', () => {
    it('is a higher order function', () => {
      expect(typeof myHoc()).toEqual('function')
    })
  })
})