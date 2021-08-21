import React from 'react'

function createComponentMock(extraNodes) {
  let mock = {}

  function ComponentMock({ children, ...restProps }) {
    let dataTestid = restProps['data-testid'] ?? '-'

    mock[dataTestid] = mock[dataTestid] ?? {
      render: jest.fn(),
      childrenArgs: [],
    }
    mock[dataTestid].props = restProps

    mock[dataTestid].render(restProps)

    if (typeof children === 'function') {
      children = children(...mock[dataTestid].childrenArgs)
    }
    return (
      <>
        <div data-testid={dataTestid}>{children}</div>
        {extraNodes?.map(({ name, args }) => (
          <div key={name}>
            {typeof restProps[name] === 'funciton'
              ? restProps[name](args)
              : restProps[name]}
          </div>
        ))}
      </>
    )
  }

  ComponentMock.mock = mock
  ComponentMock.resetMock = () => {
    mock = {}
    ComponentMock.mock = mock
  }
  ComponentMock.setupMock = (dataTestid, childrenArgs) => {
    ComponentMock.mock[dataTestid] = {
      render: jest.fn(),
      childrenArgs,
    }
  }

  return ComponentMock
}

export default createComponentMock
