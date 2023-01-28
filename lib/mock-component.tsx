import {
  ForwardedRef,
  Fragment,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  forwardRef,
  useImperativeHandle,
} from 'react'

import { BUTTON_PROPS } from './button-props'
import { DIV_PROPS } from './div-props'
import { INPUT_PROPS } from './input-props'

type TypeAs = 'div' | 'input' | 'button' | 'label'

interface MockSettings<TAs, TRef> {
  as?: TAs
  ref?: TRef
  renderProps?: string[]
}

interface ComponentMock<TProps = unknown, TRef = unknown>
  extends React.ForwardRefExoticComponent<
    React.PropsWithoutRef<PropsWithChildren<TProps>> & React.RefAttributes<TRef>
  > {
  propsRef: { current?: TProps }
  ref?: TRef
  renderSpy: jest.Mock<ReactElement | null, [TProps]>
}

type Ref<TAs extends string> = TAs extends 'div'
  ? HTMLDivElement
  : TAs extends 'input'
  ? HTMLInputElement
  : TAs extends 'button'
  ? HTMLButtonElement
  : TAs extends 'label'
  ? HTMLLabelElement
  : unknown

type MockFunction = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TProps extends Record<string, any> & { children?: ReactNode },
  TRef = unknown
>(
  settings?: MockSettings<TypeAs, TRef>
) => ComponentMock<TProps, TRef>

function mockComponent<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TProps extends Record<string, any> & { children?: ReactNode } = Record<
    string,
    never
  >,
  TRef = unknown
>({
  as = 'div',
  ref,
  renderProps,
}: MockSettings<TypeAs, TRef> = {}): ComponentMock<TProps, TRef> {
  const renderSpy = jest.fn()
  const props: { current?: TProps } = {}

  function Component(
    { children, ...restProps }: PropsWithChildren<TProps>,
    reactRef: ForwardedRef<Ref<TypeAs> | TRef>
  ) {
    renderSpy(restProps)
    props.current = restProps as TProps

    const sanitizedProps: Record<string, unknown> = {}
    const validProps =
      as === 'div' ? DIV_PROPS : as === 'input' ? INPUT_PROPS : BUTTON_PROPS
    Object.entries(restProps).forEach(([key, value]) => {
      if (validProps[key] || key.startsWith('data-')) {
        sanitizedProps[key] = value
      }
    })

    if (ref) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useImperativeHandle(reactRef, () => ref)
    }

    // TODO: Separate instances like by testId or other attributes.

    switch (as) {
      case 'div':
        return (
          <div
            {...sanitizedProps}
            ref={reactRef as ForwardedRef<HTMLDivElement>}
          >
            <Content renderProps={renderProps} {...restProps}>
              {children}
            </Content>
          </div>
        )
      case 'input':
        return (
          <Content renderProps={renderProps} {...restProps}>
            <input
              {...sanitizedProps}
              ref={reactRef as ForwardedRef<HTMLInputElement>}
            />
            {children}
          </Content>
        )
      case 'button':
        return (
          <button
            {...sanitizedProps}
            ref={reactRef as ForwardedRef<HTMLButtonElement>}
          >
            <Content renderProps={renderProps} {...restProps}>
              {children}
            </Content>
          </button>
        )
      case 'label':
        return (
          <label
            {...sanitizedProps}
            ref={reactRef as ForwardedRef<HTMLLabelElement>}
          >
            <Content renderProps={renderProps} {...restProps}>
              {children}
            </Content>
          </label>
        )
      default:
        return null
    }
  }

  const ForwardedComponent = forwardRef(Component) as ComponentMock<
    TProps,
    TRef
  >
  ForwardedComponent.renderSpy = renderSpy
  ForwardedComponent.propsRef = props
  ForwardedComponent.ref = ref

  return ForwardedComponent
}

interface ContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
  renderProps?: string[]
}

function Content({
  children,
  renderProps,
  ...restProps
}: PropsWithChildren<ContentProps>) {
  return (
    <>
      {renderProps?.map((item) => (
        <Fragment key={item}>{restProps[item]}</Fragment>
      ))}
      {children}
    </>
  )
}

export default mockComponent as MockFunction
export type { ComponentMock, MockFunction }
