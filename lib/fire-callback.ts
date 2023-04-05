import { act } from '@testing-library/react'
import { ComponentType } from 'react'
import { ComponentMock } from './mock-component'
import { get } from './path'

async function fireCallback<TProps = any>(
    component: ComponentType<TProps>,
    eventName: keyof TProps,
    args: any[] = [],
    nthCall: number = 1
) {
    const componentMock = component as ComponentMock<TProps>
    const props = componentMock._fn.mock.calls[nthCall - 1]?.[0]

    if (!props) {
        console.error(
            `Could not fireCallback "${String(eventName)}". Component ${
                componentMock.displayName
            } was not called ${nthCall} times.`
        )
        return
    }

    const callback = get(props, String(eventName))
    if (!callback || typeof callback !== 'function') {
        console.error(
            `Callback "${String(
                eventName
            )}" is either undefined or not a function.`
        )
        return
    }

    await act(async () => {
        await callback(...args)
    })
}

export default fireCallback
