import { isEqual } from 'lodash'

function checkIsComponentMock(mock: any) {
    if (!(typeof mock._fn === 'function' && mock._fn._isMockFunction)) {
        throw new Error(`Expected a mock component`)
    }
}

const tab = '    '

function formatText(text: string, paint: boolean, color: string) {
    if (paint) {
        return `\x1b[${color}${text}\x1b[0m`
    }

    return text
}

function printValue(value: any) {
    return typeof value === 'string'
        ? `"${value}"`
        : typeof value === 'object' &&
          value['$$typeof'] === Symbol.for('react.element')
        ? 'React.Element'
        : typeof value === 'function'
        ? 'Function'
        : value
}

function printProps(props: any, index = 1) {
    let message = ''

    Object.entries(props).forEach(([key, value]) => {
        let padding = ''
        for (let i = 0; i < index; i++) {
            padding += tab
        }

        if (
            typeof value === 'object' &&
            value &&
            value['$$typeof'] !== Symbol.for('react.element')
        ) {
            message += `${padding}${key}: {\n${printProps(
                value,
                index + 1
            )}${padding}}\n`
        } else {
            message += `${padding}${key}: ${printValue(value)},\n`
        }
    })

    return message
}

function printDiffProps(
    expected: any,
    actual: any,
    color: string,
    index = 1,
    diff = false
) {
    let message = ''

    if (expected === undefined) {
        message += `${formatText(
            `${tab}undefined`,
            actual !== undefined,
            color
        )}`
        return message
    }

    Object.entries(expected).forEach(([key, value]) => {
        let padding = ''
        for (let i = 0; i < index; i++) {
            padding += tab
        }

        if (
            typeof value === 'object' &&
            value &&
            value['$$typeof'] !== Symbol.for('react.element')
        ) {
            const paint = diff || !actual?.[key]

            message += `${formatText(
                `${padding}${key}: {`,
                paint,
                color
            )}\n${printDiffProps(
                value,
                actual?.[key],
                color,
                index + 1,
                paint
            )}${formatText(`${padding}}`, paint, color)}\n`
        } else {
            const paint = diff || !isEqual(value, actual?.[key])

            message += `${formatText(
                `${padding}${key}: ${printValue(value)},`,
                paint,
                color
            )} \n`
        }
    })

    return message
}

export { printProps, printDiffProps, checkIsComponentMock }
