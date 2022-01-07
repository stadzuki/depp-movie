import "./film-step.scss"

function FilmStep ({onCloseModal, steps}) {
    return (
        <div className="modal-wrapper">
            <div className="overlay" onClick={() => onCloseModal(false)}></div>
            <div className="film-step film-step__container">
                <div  className="film-step__container">
                    {steps.map((step, index) => {
                        const wrapperClass = index === 0
                            ? 'film-step__top film-step__arrow-step'
                            : index === steps.length - 1
                                ? 'film-step__bottom' : 'film-step__middle__element';

                        const titleClass = index === 0 || index === steps.length - 1
                            ? 'film-step__main-title' : 'film-step__title'

                        return (
                            <div className={wrapperClass}>
                                <p className={titleClass}>Подготовка к съемкам</p>
                                <p className="film-step__subtitle">До 30.09.2019</p>
                            </div>
                        )
                    })}
                </div>
                <div className="film-step__close-btn" onClick={() => onCloseModal(false)}>
                    <img src="/img/close-btn.svg" alt="x" width="40" height="40"/>
                </div>
            </div>
        </div>
    )
}

export default FilmStep
