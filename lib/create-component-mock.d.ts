import React, { FunctionComponent } from 'react'

export type ComponentInstanceMock<TProps> = {
  render: jest.Mock<void, [TProps, React.ReactNode]>
  props: TProps
}

export type ComponentMock<TProps = any> = {
  mock: ComponentInstanceMock<TProps>
  resetMock: () => void
}

export function createComponentMock<TProps = any>(): ComponentMock<TProps>
