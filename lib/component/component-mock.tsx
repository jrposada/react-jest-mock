import {
    ForwardedRef,
    forwardRef,
    PropsWithChildren,
    ReactElement,
    useImperativeHandle,
} from 'react'
import ComponentMockChildren, {
    ComponentMockChildrenProps,
    Refs,
} from './component-mock-children'

interface ComponentMockProps<TProps extends Record<string, any>, TRef>
    extends ComponentMockChildrenProps<TProps> {
    fn: jest.Mock<ReactElement | null, [TProps]>
    refMock: TRef | undefined
}

function ComponentMock<TProps extends Record<string, any>, TRef>(
    {
        as,
        fn,
        props,
        refMock,
        renderProps,
        children,
    }: PropsWithChildren<ComponentMockProps<TProps, TRef>>,
    ref: ForwardedRef<TRef>
) {
    // Log render on jest.fn instance
    fn(props)

    // If there ref is set up then expose it as component ref
    if (refMock) {
        useImperativeHandle(ref, () => refMock)
    }

    // TODO: Separate instances like by testId or other attributes.

    return (
        <ComponentMockChildren<TProps>
            ref={ref as ForwardedRef<Refs>}
            as={as}
            props={props}
            renderProps={renderProps}
        >
            {children}
        </ComponentMockChildren>
    )
}

export default forwardRef(ComponentMock)
export type { ComponentMockProps }
