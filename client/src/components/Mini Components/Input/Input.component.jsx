import "./Input.styles.scss"

export const Input = ({label, ...otherProps}) => {
    return (
        <div className="input-group">
            <label htmlFor="">{label}</label>
            <input {...otherProps} />
        </div>
    )
}