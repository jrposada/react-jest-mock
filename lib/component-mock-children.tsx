import { ForwardedRef, forwardRef, PropsWithChildren } from 'react'
import { BUTTON_PROPS } from './button-props'
import { DIV_PROPS } from './div-props'
import { INPUT_PROPS } from './input-props'
import RenderProps, { RenderPropsProps } from './render-props'

type Refs =
    | HTMLButtonElement
    | HTMLInputElement
    | HTMLLabelElement
    | HTMLDivElement

interface ComponentMockChildrenProps<TProps extends Record<string, any>>
    extends RenderPropsProps<TProps> {
    as: 'div' | 'input' | 'button' | 'label'
}

function ComponentMockChildren<TProps extends Record<string, any>>(
    {
        children,
        renderProps,
        props,
        as,
    }: PropsWithChildren<ComponentMockChildrenProps<TProps>>,
    ref: ForwardedRef<Refs>
) {
    // Get sanitized props
    const sanitizedProps: Record<string, unknown> = {}
    const validProps =
        as === 'div' ? DIV_PROPS : as === 'input' ? INPUT_PROPS : BUTTON_PROPS
    Object.entries(props).forEach(([key, value]) => {
        if (validProps[key] || key.startsWith('data-')) {
            sanitizedProps[key] = value
        }
    })

    return as === 'button' ? (
        <button
            {...sanitizedProps}
            ref={ref as ForwardedRef<HTMLButtonElement>}
        >
            <RenderProps renderProps={renderProps} props={props} />
            {children}
        </button>
    ) : as === 'input' ? (
        <>
            <input
                {...sanitizedProps}
                ref={ref as ForwardedRef<HTMLInputElement>}
            />
            <RenderProps renderProps={renderProps} props={props} />
            {children}
        </>
    ) : as === 'label' ? (
        <label {...sanitizedProps} ref={ref as ForwardedRef<HTMLLabelElement>}>
            <RenderProps renderProps={renderProps} props={props} />
            {children}
        </label>
    ) : (
        <div {...sanitizedProps} ref={ref as ForwardedRef<HTMLDivElement>}>
            <RenderProps renderProps={renderProps} props={props} />
            {children}
        </div>
    )
}

export default forwardRef(ComponentMockChildren)
export type { ComponentMockChildrenProps, Refs }
