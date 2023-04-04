import { isEqual } from 'lodash'

const tab = '    '

function printValue(value: any) {
    return typeof value === 'string' ? `"${value}"` : value
}

function printProps(props: any, index = 1) {
    let message = ''

    Object.entries(props).forEach(([key, value]) => {
        let padding = ''
        for (let i = 0; i < index; i++) {
            padding += tab
        }

        if (typeof value === 'object') {
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

    Object.entries(expected).forEach(([key, value]) => {
        let padding = ''
        for (let i = 0; i < index; i++) {
            padding += tab
        }

        let colorStart = ''
        let colorEnd = ''

        if (typeof value === 'object') {
            if (!diff && !actual?.[key]) {
                colorStart = `\x1b[${color}`
                colorEnd = '\x1b[0m'
            }

            message += `${colorStart}${padding}${key}: {${colorEnd}\n${printDiffProps(
                value,
                actual?.[key],
                color,
                index + 1,
                !!colorStart
            )}${padding}${colorStart}}${colorEnd}\n`
        } else {
            if (diff || !isEqual(value, actual?.[key])) {
                colorStart = `\x1b[${color}`
                colorEnd = '\x1b[0m'
            }

            message += `${colorStart}${padding}${key}: ${printValue(
                value
            )}, ${colorEnd}\n`
        }
    })

    return message
}

export { printProps, printDiffProps }
