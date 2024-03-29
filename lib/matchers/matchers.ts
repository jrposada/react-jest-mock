import { isEqual, isMatch } from 'lodash'
import { ComponentMock } from '../component/mock-component'
import {
    checkIsComponentMock,
    formatText,
    printDiffProps,
    printProps,
} from './matchers-utils'

function toHaveBeenRendered(mock: ComponentMock<any, any>) {
    checkIsComponentMock(mock)

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
    checkIsComponentMock(mock)

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

function toHaveBeenRenderedWith(mock: ComponentMock<any, any>, expected: any) {
    checkIsComponentMock(mock)

    const renderCallsProps = mock._fn.mock.calls
        .filter((call) => !!call[0])
        .map((call) => call[0])

    const usePartialMatch =
        expected.$$typeof === Symbol.for('jest.asymmetricMatcher')
    const expectedProps = usePartialMatch ? expected.sample : expected

    const matchedRenderCallsProps = renderCallsProps.filter((props) =>
        usePartialMatch
            ? isMatch(props, expectedProps)
            : isEqual(props, expectedProps) &&
              Object.keys(props).length === Object.keys(expectedProps).length
    )

    const pass = matchedRenderCallsProps.length > 0

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
        const actualRenderCallsProps = renderCallsProps.filter((props) =>
            Object.keys(expectedProps).some(
                (propName) => !isEqual(props[propName], expectedProps[propName])
            )
        )

        const message = `Expected ${
            mock.displayName
        } to have been rendered with props\n\n${printDiffProps(
            expectedProps,
            actualRenderCallsProps[0],
            '32m'
        )}\n, but it was rendered with\n\n${printDiffProps(
            actualRenderCallsProps[0],
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
    expected: any
) {
    checkIsComponentMock(mock)

    const renderCalls = mock._fn.mock.calls
    const renderCallProps = renderCalls[nthCall - 1]?.[0]

    const usePartialMatch =
        expected.$$typeof === Symbol.for('jest.asymmetricMatcher')
    const expectedProps = usePartialMatch ? expected.sample : expected

    const pass =
        !!renderCallProps &&
        (usePartialMatch
            ? isMatch(renderCallProps, expectedProps)
            : isEqual(renderCallProps, expectedProps))

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
        let message = ''

        if (!renderCallProps) {
            message = `Expected ${mock.displayName} to have been ${formatText(
                `${nthCall}nth`,
                true,
                '32m'
            )} rendered with props\n\n${printDiffProps(
                expectedProps,
                renderCallProps,
                '90m'
            )}\n, but it was rendered ${formatText(
                `${renderCalls.length}`,
                true,
                '31m'
            )} times`
        } else {
            message = `Expected ${
                mock.displayName
            } to have been ${nthCall} rendered with props\n\n${printDiffProps(
                expectedProps,
                renderCallProps,
                '32m'
            )}\n, but it was rendered with\n\n${printDiffProps(
                renderCallProps,
                expectedProps,
                '31m'
            )}`
        }

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
