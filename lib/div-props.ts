import { HTMLAttributes } from 'react'

const DIV_PROPS: {
  [key in keyof HTMLAttributes<HTMLDivElement>]: true
} = {
  // React-specific Attributes
  defaultChecked: true,
  defaultValue: true,
  suppressContentEditableWarning: true,
  suppressHydrationWarning: true,

  // Standard HTML Attributes
  accessKey: true,
  className: true,
  contentEditable: true,
  contextMenu: true,
  dir: true,
  draggable: true,
  hidden: true,
  id: true,
  lang: true,
  placeholder: true,
  slot: true,
  spellCheck: true,
  style: true,
  tabIndex: true,
  title: true,
  translate: true,

  // Unknown
  radioGroup: true,

  // WAI-ARIA
  role: true,

  // RDFa Attributes
  about: true,
  datatype: true,
  inlist: true,
  prefix: true,
  property: true,
  resource: true,
  vocab: true,

  // Non-standard Attributes
  autoCapitalize: true,
  autoCorrect: true,
  autoSave: true,
  color: true,
  itemProp: true,
  itemScope: true,
  itemType: true,
  itemID: true,
  itemRef: true,
  results: true,
  security: true,
  unselectable: true,

  // Living Standard
  /**
   * Hints at the type of data that might be entered by the user while editing the element or its contents
   * @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
   */
  inputMode: true,
  /**
   * Specify that a standard HTML element should behave like a defined custom built-in element
   * @see https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is
   */
  is: true,

  /** Events */
  onClick: true,
}

export { DIV_PROPS }
