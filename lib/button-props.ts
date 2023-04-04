import { InputHTMLAttributes } from 'react'
import { DIV_PROPS } from './div-props'

const BUTTON_PROPS: {
    [key in keyof InputHTMLAttributes<HTMLInputElement>]: true
} = {
    ...DIV_PROPS,

    autoFocus: true,
    disabled: true,
    form: true,
    formAction: true,
    formEncType: true,
    formMethod: true,
    formNoValidate: true,
    formTarget: true,
    name: true,
    type: true,
    value: true,
}

export { BUTTON_PROPS }
