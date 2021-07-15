import React from 'react'

function createComponentMock() {
  const mock = {}

  function ComponentMock({ children, ...restProps }) {
    if (!restProps['data-testid']) {
      throw new Error(
        'You are rendering a ComponentMock without a "data-testid" attribute. This is not allowed.'
      )
    }

    const currentMock = {
      render: jest.fn(),
      callback: {},
    }

    currentMock.render(restProps, children)

    Object.keys(restProps).forEach((key) => {
      if (typeof restProps[key] === 'function') {
        currentMock.callback[key] = restProps[key]
      }
    })

    mock[restProps['data-testid']] = currentMock
    return <div>{children}</div>
  }
  ComponentMock.mock = mock

  return ComponentMock
}

export default createComponentMock
