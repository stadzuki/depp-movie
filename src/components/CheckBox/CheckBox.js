import "./check-box.scss"

function CheckBox ({setter, title, inputId, getter}) {

    function onCheckBoxChange () {
        setter((prev) => !prev)
    }

    return (
        <div className="check-box">
            <input className="check-box__input" type="checkbox" id={inputId} checked={getter} onChange={onCheckBoxChange}/>
            <label className="check-box__label" htmlFor={inputId}>
                <span className="check-box__label__box"></span>
                {title}
            </label>
        </div>
    )
}

export default CheckBox
