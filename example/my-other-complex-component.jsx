function MyOtherComplexComponent({ header, children, footer, ...restProps }) {
  return (
    <div {...restProps}>
      {header}
      {children("I'm complex")}
      {footer}
    </div>
  )
}

export default MyOtherComplexComponent
