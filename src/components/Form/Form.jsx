const Form = ({ children, name, onSubmit, className }) => {
  return (
      <form className={className} name={name} onSubmit={onSubmit} novalidate>
          {children}
      </form>
  )
}

export default Form;