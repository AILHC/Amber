const Component = ({ name, child }) => {
  const clazz = name.toLowerCase().replace(/\s+/g, '_')

  return <fieldset className={`${clazz} collapsed shadow-sm rounded`}>
    <legend className="container">
      <div className="row">
        <h3 className="col-auto g-0 disable-select">{name}</h3>
        {child}
      </div>
    </legend>
  </fieldset>
}

export default Component