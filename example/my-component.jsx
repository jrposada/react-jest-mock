import React from 'react'

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
    </>
  )
}

export default MyComponent
