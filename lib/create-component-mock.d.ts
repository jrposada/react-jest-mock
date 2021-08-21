import React, { FunctionComponent } from 'react'

export type ComponentInstanceMock<TProps, TChildrenArgs> = {
  render: jest.Mock<void, [TProps, React.ReactNode]>
  props: TProps
  childrenArgs: TChildrenArgs
}

export type ComponentMock<TProps = any, TChildrenArgs = any> = {
  mock: ComponentInstanceMock<TProps, TChildrenArgs>
  resetMock: () => void
}

export type ExtraNode = {
  name: string
  args: any
}

export function createComponentMock<TProps = any>(
  extraNodes: ExtraNode[] = []
): ComponentMock<TProps>
