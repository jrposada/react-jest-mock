import { ComponentMock } from '../component/mock-component'

function getRef<TRef>(
    component: (
        props: unknown & React.RefAttributes<TRef>
    ) => React.ReactElement | null
) {
    const componentMock = component as ComponentMock<unknown, TRef>

    if (!componentMock._ref) {
        console.error(
            `Component ${componentMock.displayName} does not have ref. Check component mock has been created with one.`
        )
    }

    return componentMock._ref!
}

export default getRef
