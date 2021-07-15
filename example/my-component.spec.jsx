import React from 'react'
import { render } from '@testing-library/react'

import MyOtherComponent from './my-other-component'
import MyComponent from './my-component'

jest.mock('./my-other-component')

describe('Given a MyComponent component', () => {
  it('when rendered it should pass the correct props to MyOtherComponent', () => {
    render(<MyComponent />)

    expect(
      MyOtherComponent.mock['first-my-other-component'].render
    ).toHaveBeenCalledTimes(1)
    expect(
      MyOtherComponent.mock['first-my-other-component'].render
    ).toHaveBeenCalledWith(
      {
        'data-testid': 'first-my-other-component',
        onCall: expect.anything(),
      },
      undefined
    )

    expect(
      MyOtherComponent.mock['second-my-other-component'].render
    ).toHaveBeenCalledTimes(1)

    expect(
      MyOtherComponent.mock['second-my-other-component'].render
    ).toHaveBeenCalledWith(
      {
        'data-testid': 'second-my-other-component',
        onCall: expect.anything(),
      },
      'Nice!'
    )
    expect(MyOtherComponent.mock['third-my-other-component']).toBeUndefined()
  })

  it('when "first-my-other-component" onCall is called then "console.log" is called with "Hello World!"', () => {
    render(<MyComponent />)

    const log = console.log
    console.log = jest.fn()
    MyOtherComponent.mock['first-my-other-component'].callback.onCall()

    expect(console.log).toHaveBeenCalledTimes(1)
    expect(console.log).toHaveBeenCalledWith('Hello World!')

    console.log = log
  })

  it('when "second-my-other-component" onCall is called then "console.log" is called with "Hello World!"', () => {
    render(<MyComponent />)

    const log = console.log
    console.log = jest.fn()
    MyOtherComponent.mock['second-my-other-component'].callback.onCall()

    expect(console.log).toHaveBeenCalledTimes(1)
    expect(console.log).toHaveBeenCalledWith('Hello 2 World!')

    console.log = log
  })
})
