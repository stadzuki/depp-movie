function ModalContainer(props) {

    return (
        <div>
            <div className="overlay" style={{top: props?.topStyle || 0}} onClick={props.close}></div>
            {props.children}
        </div>
    )
}

export default ModalContainer
