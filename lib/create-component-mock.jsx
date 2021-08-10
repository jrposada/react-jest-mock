import React from 'react'

function createComponentMock() {
  const mock = {}

  function ComponentMock({ children, ...restProps }) {
    let dataTestid = restProps['data-testid'] ?? '-'

    const currentMock = {
      render: jest.fn(),
      props: restProps,
    }

    currentMock.render(restProps, children)

    mock[dataTestid] = currentMock
    return <div dasta-testid={dataTestid}>{children}</div>
  }

  ComponentMock.mock = mock
  ComponentMock.resetMock = () => {
    mock = {}
    ComponentMock.mock = mock
  }

  return ComponentMock
}

export default createComponentMock
