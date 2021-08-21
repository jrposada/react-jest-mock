import React from 'react'

import MyOtherComplexComponent from './my-other-complex-component'
import MyOtherComponent from './my-other-component'

function MyComponent() {
  const hello = 'Hello World!'
  const hello2 = 'Hello 2 World!'

  function myFunction() {
    console.log(hello)
  }

  const myArrowFunction = () => {
    console.log(hello2)
  }

  return (
    <>
      <MyOtherComponent
        data-testid="first-my-other-component"
        onCall={myFunction}
      />
      <MyOtherComponent
        data-testid="second-my-other-component"
        onCall={() => myArrowFunction()}
      >
        Nice!
      </MyOtherComponent>
      <MyOtherComplexComponent
        data-testid="my-other-complex-component"
        header={
          <MyOtherComponent data-testid="paco-header">Head</MyOtherComponent>
        }
        footer={
          <MyOtherComponent data-testid="paco-footer">Foot</MyOtherComponent>
        }
      >
        {(message) => <>{`Paco pizza says: ${message}`}</>}
      </MyOtherComplexComponent>
    </>
  )
}

export default MyComponent
