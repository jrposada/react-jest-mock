import { InputHTMLAttributes } from 'react'
import { DIV_PROPS } from './div-props'

const INPUT_PROPS: {
  [key in keyof InputHTMLAttributes<HTMLInputElement>]: true
} = {
  ...DIV_PROPS,

  accept: true,
  alt: true,
  autoComplete: true,
  autoFocus: true,
  capture: true,
  checked: true,
  crossOrigin: true,
  disabled: true,
  enterKeyHint: true,
  form: true,
  formAction: true,
  formEncType: true,
  formMethod: true,
  formNoValidate: true,
  formTarget: true,
  height: true,
  list: true,
  max: true,
  maxLength: true,
  min: true,
  minLength: true,
  multiple: true,
  name: true,
  pattern: true,
  placeholder: true,
  readOnly: true,
  required: true,
  size: true,
  src: true,
  step: true,
  type: true,
  value: true,
  width: true,

  onChange: true,
}

export { INPUT_PROPS }
