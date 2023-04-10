import { ComponentMock } from '../component/mock-component'

function componentReset(mock: ComponentMock<any, any>) {
    mock._fn.mockReset()
}

export default componentReset
