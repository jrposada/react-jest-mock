import {
    toHaveBeenRendered,
    toHaveBeenRenderedTimes,
    toHaveBeenRenderedWith,
    toHaveBeenNthRenderedWith,
} from './lib/matchers/matchers'
import mockComponent, { ComponentMock } from './lib/component/mock-component'
import fireCallback from './lib/utils/fire-callback'
import componentReset from './lib/utils/component-reset'

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

export { mockComponent, fireCallback, componentReset }
export type { ComponentMock }
