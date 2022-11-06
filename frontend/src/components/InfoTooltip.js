import complete from "../img/complete.png";
import cancel from "../img/cancel.png";


function InfoTooltip(props) {
    return (
        <div
            className={`popup popup__infotooltip ${props.isOpen && "popup_active"
                }`}>
            <div className="popup__container">
                <button
                    onClick={props.onClose}
                    type="button"
                    className="popup__close"
                ></button>
                <div className="popup__case">
                    <img className="popup__img" src={props.register ? complete : cancel} alt="Логотип Mesto" />
                    <h2 className="popup__title popup__register-title">{props.register ? props.complete : props.cancel}</h2>
                </div>
            </div>
        </div >
    );
}

export default InfoTooltip;
