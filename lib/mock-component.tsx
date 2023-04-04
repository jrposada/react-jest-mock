import {
    PropsWithChildren,
    ReactElement,
    ReactNode,
    forwardRef,
    createElement,
} from 'react'
import ComponentMock, { ComponentMockProps } from './component-mock'

declare module 'react' {
    function forwardRef<T, P = {}>(
        render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
    ): (props: P & React.RefAttributes<T>) => React.ReactElement | null
}

interface ComponentMock<TProps = unknown, TRef = unknown>
    extends React.ForwardRefExoticComponent<
        React.PropsWithoutRef<PropsWithChildren<TProps>> &
            React.RefAttributes<TRef>
    > {
    _ref?: TRef
    _fn: jest.Mock<ReactElement | null, [TProps]>
}

interface Params<TProps extends Record<string, any>, TRef> {
    name?: string
    as?: ComponentMockProps<TProps, TRef>['as']
    ref?: TRef
    renderProps?: ComponentMockProps<TProps, TRef>['renderProps']
}

function mockComponent<
    TProps extends Record<string, any> = Record<string, never>,
    TRef = unknown
>({
    as = 'div',
    ref: refMock,
    name,
    renderProps = [],
}: Params<TProps, TRef> = {}) {
    const fn = jest.fn<ReactElement | null, [TProps]>()
    Object.defineProperty(fn, 'name', { value: name })

    const ForwardedComponent = forwardRef<TRef, PropsWithChildren<TProps>>(
        ({ children, ...props }, ref) => (
            <ComponentMock<TProps, TRef>
                as={as}
                fn={fn}
                props={props as TProps}
                renderProps={renderProps}
                refMock={refMock}
                ref={ref}
            >
                {children}
            </ComponentMock>
        )
    ) as unknown as ComponentMock<TProps, TRef>
    ForwardedComponent.displayName = `<${name} />`
    ForwardedComponent._fn = fn
    ForwardedComponent._ref = refMock

    return ForwardedComponent
}

export default mockComponent
export type { ComponentMock }
