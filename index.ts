import {
    toHaveBeenRendered,
    toHaveBeenRenderedTimes,
    toHaveBeenRenderedWith,
    toHaveBeenNthRenderedWith,
} from './lib/matchers/matchers'
import mockComponent, { ComponentMock } from './lib/component/mock-component'
import fireCallback from './lib/utils/fire-callback'
import componentReset from './lib/utils/component-reset'
import getProps from './lib/utils/get-props'
import getRef from './lib/utils/get-ref'

declare global {
    namespace jest {
        interface Matchers<R> {
            toHaveBeenRendered(): R
            toHaveBeenRenderedTimes(calls: number): R
            toHaveBeenRenderedWith<TProps = any>(expectedProps: TProps): R
            toHaveBeenNthRenderedWith<TProps = any>(
                call: number,
                expectedProps: TProps
            ): R
        }
    }
}

expect.extend({
    toHaveBeenRendered,
    toHaveBeenRenderedTimes,
    toHaveBeenRenderedWith,
    toHaveBeenNthRenderedWith,
})

export { mockComponent, fireCallback, componentReset, getProps, getRef }
export type { ComponentMock }
