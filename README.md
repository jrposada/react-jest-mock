# React Jest Mock
Mock React components with just one line. Isolate your unit tests while controlling how nested components behave.

# Getting started
1. Create a component mock through jest `__mocks__` folder.
``` ts
import { mockComponent } from 'react-jest-mock';

const MyDependency = mockComponent()

export default MyDependency
```

2. Mock your dependencies in your unit test.
``` ts
import { render } from '@testing-library/react';

import MyDependency from './my-dependency';

import MyComponent from './my-component';

// Manually invoke jest.mock if needed.
jest.mock('./my-dependency');

// Cast component type into Mock type. NOTE: this is only needed in Typescript.
const MyDependencyMock = MyDependency as ComponentMock;

describe('...', () => {
    it('...', () => {
        render(<MyComponent />);

        expect(MyDependencyMock.renderSpy).toHaveBeenCalled()
    })
})
```

# Configuration
By default ````mockComponent()``` will just render a div element. This behavior and more can be change by passing an optional parameter to the function.
``` ts
const settings = {
    as: 'input', // Controls what element will be render on the dom. Supported values are: input, button, label and div.
    ref: {}, // Reference exposed by the component.
    renderProps: ['propName'], // Array of prop names which should also be rendered.
}
const MyDependency = mockComponent(settings)
```

# Firing events
All props passed to the mock component are accessible through the "propsRef" object and can be directly called inside and "act".
``` ts
act(() => {
    MyDependencyMock.current.someCallback(...args)
});
```
