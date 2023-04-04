# React Jest Mock
Mock React components with just one line. Isolate your unit tests while controlling how nested components behave.

# Getting started
1. Create a component mock through jest `__mocks__` folder.
``` ts
import { mockComponent } from 'react-jest-mock';

const MyDependency = mockComponent({name: "MyDependency"});

export default MyDependency;
```

2. Mock your dependencies in your unit test.
``` ts
import { render } from '@testing-library/react';

import MyDependency from './my-dependency';

import MyComponent from './my-component';

// Manually invoke jest.mock if needed.
jest.mock('./my-dependency');

describe('...', () => {
    it('...', () => {
        render(<MyComponent />);

        expect(MyDependency).toHaveBeenRendered();
    })
});
```

# Configuration
By default `mockComponent()` will just render a div element. This behavior and more can be change by passing an optional parameter to the function.
``` ts
const settings = {
    name: 'MyDependency', // Component name. Used for error messages.
    as: 'input', // Controls what element will be render on the dom. Supported values are: input, button, label and div.
    ref: {}, // Reference exposed by the component.
    renderProps: ['propName'], // Array of prop names which should also be rendered.
}
const MyDependency = mockComponent(settings);
```

# Custom matchers
1. toHaveBeenRendered
2. toHaveBeenRenderedTimes
3. toHaveBeenRenderedWith
4. toHaveBeenNthRenderedWith

# Firing events
Components callbacks can be invoke through "fireCallback" utility function. Note that this utility is prepared to handle async callbacks too so it should be awaited.
``` ts
await fireCallback(MyDependency, "myCb", argsArray, nthCalled);
```
