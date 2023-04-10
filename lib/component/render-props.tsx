import { Fragment } from 'react'

interface RenderPropsProps<TProps extends Record<string, any>> {
    renderProps: string[]
    props: TProps
}

function RenderProps<TProps extends Record<string, any>>({
    renderProps,
    props,
}: RenderPropsProps<TProps>) {
    return (
        <>
            {renderProps.map((name) => (
                <Fragment key={name}>{props[name]}</Fragment>
            ))}
        </>
    )
}

export default RenderProps
export type { RenderPropsProps }
