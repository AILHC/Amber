const Component = ({ label, child }) => {
  const clazz = label.toLowerCase().replace(/\s+/g, '_')

  return <fieldset className={`${clazz} collapsed shadow-sm rounded`}>
    <legend className="container">
      <div className="row">
        <h3 className="col-auto g-0 disable-select">{label}</h3>
        {child}
      </div>
    </legend>
  </fieldset>
}

export default Component