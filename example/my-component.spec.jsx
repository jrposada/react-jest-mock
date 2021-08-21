import React from 'react'

import { render, screen } from '@testing-library/react'

import MyComponent from './my-component'
import MyOtherComplexComponent from './my-other-complex-component'
import MyOtherComponent from './my-other-component'

jest.mock('./my-other-component')
jest.mock('./my-other-complex-component')

describe('Given a MyComponent component', () => {
  afterEach(() => {
    MyOtherComponent.resetMock()
    MyOtherComplexComponent.resetMock()
  })

  it('when rendered it should pass the correct props to MyOtherComponent', () => {
    render(<MyComponent />)

    expect(
      MyOtherComponent.mock['first-my-other-component'].render
    ).toHaveBeenCalledTimes(1)
    expect(
      MyOtherComponent.mock['first-my-other-component'].render
    ).toHaveBeenCalledWith({
      'data-testid': 'first-my-other-component',
      onCall: expect.anything(),
    })

    expect(
      MyOtherComponent.mock['second-my-other-component'].render
    ).toHaveBeenCalledTimes(1)

    expect(
      MyOtherComponent.mock['second-my-other-component'].render
    ).toHaveBeenCalledWith({
      'data-testid': 'second-my-other-component',
      onCall: expect.anything(),
    })
    expect(MyOtherComponent.mock['third-my-other-component']).toBeUndefined()
  })

  it('when "first-my-other-component" onCall is called then "console.log" is called with "Hello World!"', () => {
    render(<MyComponent />)

    const log = console.log
    console.log = jest.fn()
    MyOtherComponent.mock['first-my-other-component'].props.onCall()

    expect(console.log).toHaveBeenCalledTimes(1)
    expect(console.log).toHaveBeenCalledWith('Hello World!')

    console.log = log
  })

  it('when "second-my-other-component" onCall is called then "console.log" is called with "Hello World!"', () => {
    render(<MyComponent />)

    const log = console.log
    console.log = jest.fn()
    MyOtherComponent.mock['second-my-other-component'].props.onCall()

    expect(console.log).toHaveBeenCalledTimes(1)
    expect(console.log).toHaveBeenCalledWith('Hello 2 World!')

    console.log = log
  })

  it('when children is a function we can define its arguments', () => {
    MyOtherComplexComponent.setupMock('my-other-complex-component', [
      'message has been intercepted!',
    ])

    render(<MyComponent />)

    expect(screen.getByTestId('my-other-complex-component').innerHTML).toBe(
      'Paco pizza says: message has been intercepted!'
    )
  })

  it('when children is a function and childrenArgs has been set then render spy can be checked', () => {
    MyOtherComplexComponent.setupMock('my-other-complex-component', [
      'message has been intercepted!',
    ])

    render(<MyComponent />)

    expect(
      MyOtherComplexComponent.mock['my-other-complex-component'].render
    ).toHaveBeenCalledTimes(1)
    expect(
      MyOtherComplexComponent.mock['my-other-complex-component'].render
    ).toHaveBeenCalledWith(
      expect.objectContaining({
        'data-testid': 'my-other-complex-component',
      })
    )
  })
})
