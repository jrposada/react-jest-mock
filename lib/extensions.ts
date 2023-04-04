import { isEqual } from 'lodash'
import { ComponentMock } from './mock-component'
import { printDiffProps, printProps } from './extension-utils'

function toHaveBeenRendered(mock: ComponentMock<any, any>) {
    const fn = mock._fn
    const mockCalls = fn.mock.calls

    if (!mockCalls.length) {
        return {
            message: () =>
                `Expected ${mock.displayName} to have been rendered, but it was not.`,
            pass: false,
        }
    }

    return {
        message: () =>
            `Expected ${mock.displayName} not to have been rendered, but it was.`,
        pass: true,
    }
}

function toHaveBeenRenderedTimes(mock: ComponentMock<any, any>, calls: number) {
    const fn = mock._fn
    const mockCalls = fn.mock.calls

    if (mockCalls.length !== calls) {
        return {
            message: () =>
                `Expected ${mock.displayName} to have been rendered ${calls} times, but it was called ${mockCalls.length} times.`,
            pass: false,
        }
    }

    return {
        message: () =>
            `Expected ${mock.displayName} not to have been rendered ${calls} times, but it was.`,
        pass: true,
    }
}

function toHaveBeenRenderedWith(mock: any, expectedProps: any) {
    if (typeof mock._fn !== 'function') {
        throw new Error(`Expected a mock component`)
    }

    const renderCalls = mock._fn.mock.calls.filter((call) => !!call[0])

    const matchedRenderCalls = renderCalls.filter((call) =>
        Object.keys(expectedProps).every((propName) =>
            isEqual(call[0][propName], expectedProps[propName])
        )
    )

    const pass = matchedRenderCalls.length > 0

    if (pass) {
        return {
            pass: true,
            message: () =>
                `Expected ${
                    mock.displayName
                } not to have been rendered with props\n\n${printProps(
                    expectedProps
                )}\n, but it was.`,
        }
    } else {
        const actualRenderCalls = renderCalls.filter((call) =>
            Object.keys(expectedProps).some(
                (propName) =>
                    !isEqual(call[0][propName], expectedProps[propName])
            )
        )

        const actualProps = actualRenderCalls.map((call) => call[0])

        const message = `Expected ${
            mock.displayName
        } to have been rendered with props\n\n${printDiffProps(
            expectedProps,
            actualProps[0],
            '32m'
        )}\n, but it was called with\n\n${printDiffProps(
            actualProps[0],
            expectedProps,
            '31m'
        )}`

        return {
            pass: false,
            message: () => message,
        }
    }
}

function toHaveBeenNthRenderedWith(
    mock: ComponentMock<any, any>,
    nthCall: number,
    expectedProps: any
) {
    if (typeof mock._fn !== 'function') {
        throw new Error(`Expected a mock component`)
    }

    const renderCall = mock._fn.mock.calls[nthCall - 1]

    const pass = !Object.keys(expectedProps).some(
        (propName) => !isEqual(renderCall[0][propName], expectedProps[propName])
    )

    if (pass) {
        return {
            pass: true,
            message: () =>
                `Expected ${
                    mock.displayName
                }  call: ${nthCall}, not to have been rendered with props\n\n${printProps(
                    expectedProps
                )}\n, but it was.`,
        }
    } else {
        const actualProps = renderCall[0]

        const message = `Expected ${
            mock.displayName
        } to have been rendered with props\n\n${printDiffProps(
            expectedProps,
            actualProps,
            '32m'
        )}\n, but it was called with\n\n${printDiffProps(
            actualProps,
            expectedProps,
            '31m'
        )}`

        return {
            pass: false,
            message: () => message,
        }
    }
}

export {
    toHaveBeenRendered,
    toHaveBeenRenderedTimes,
    toHaveBeenRenderedWith,
    toHaveBeenNthRenderedWith,
}
