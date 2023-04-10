import { ComponentType } from 'react'
import { ComponentMock } from '../component/mock-component'

function getProps<TProps>(
    component: ComponentType<TProps>,
    nthCall: number = 1
) {
    const componentMock = component as ComponentMock<TProps>

    return componentMock._fn.mock.calls[nthCall - 1][0] as TProps
}

export default getProps
