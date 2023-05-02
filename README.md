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
import MyOtherDependency from './my-other-dependency';

import MyComponent from './my-component';

// Manually invoke jest.mock if needed.
jest.mock('./my-dependency');

// The mock can also be created inline through jest.requireActual
jest.mock('/my-other-dependency', () => {
    const mockComponent = jest.requireActual("react-jest-mock").mockComponent;
    return mockComponent({ name: "MyOtherDependency" });
})

describe('...', () => {
    it('...', () => {
        render(<MyComponent />);

        expect(MyDependency).toHaveBeenRendered();
    })

    it('...', () => {
        render(<MyComponent />);

        expect(MyOtherDependency).toHaveBeenRendered();
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
2. toHaveBeenRenderedTimes
``` ts
import { render } from '@testing-library/react';

import MyDependency from './my-dependency';

import MyComponent from './my-component';

// Manually invoke jest.mock if needed.
jest.mock('./my-dependency');

describe('...', () => {
    it('...', () => {
        render(<MyComponent />);

        expect(MyDependency).toHaveBeenRenderedTimes(1);
    })
});
```
3. toHaveBeenRenderedWith
``` ts
import { render } from '@testing-library/react';

import MyDependency from './my-dependency';

import MyComponent from './my-component';

// Manually invoke jest.mock if needed.
jest.mock('./my-dependency');

describe('...', () => {
    it('...', () => {
        render(<MyComponent />);

        expect(MyDependency).toHaveBeenRenderedWith({name: 'test'});
    })
});
```
4. toHaveBeenNthRenderedWith
``` ts
import { render } from '@testing-library/react';

import MyDependency from './my-dependency';

import MyComponent from './my-component';

// Manually invoke jest.mock if needed.
jest.mock('./my-dependency');

describe('...', () => {
    it('...', () => {
        render(<MyComponent />);

        expect(MyDependency).toHaveBeenNthRenderedWith(1, {name: 'test'});
    })
});
```

# Firing events
Components callbacks can be invoke through "fireCallback" utility function. Note that this utility is prepared to handle async callbacks too so it should be awaited.
``` ts
await fireCallback(MyDependency, "myCb", argsArray, nthCalled);
```
