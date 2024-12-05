import './Select.styles.scss'

export const Select = ({label, options, name, ...otherProps}) => {
    return (
      <div className="select-container">
        <label htmlFor={name}>{label}</label>
        <select {...otherProps} name={name}>
          <option value="">Default</option>
          {options.map((option, index) => (
            <option value={option.value} key={index}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
}