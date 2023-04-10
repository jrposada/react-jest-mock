import { ComponentType } from 'react'
import { ComponentMock } from '../component/mock-component'

function componentReset<TProps>(component: ComponentType<TProps>) {
    const componentMock = component as ComponentMock<TProps>

    componentMock._fn.mockReset()
}

export default componentReset
