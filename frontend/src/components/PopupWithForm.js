function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_form_${props.name} ${props.isOpen && "popup_active"
        }`}
    >
      <div className="popup__container">
        <button
          onClick={props.onClose}
          type="button"
          className="popup__close"
        ></button>
        <form
          onSubmit={props.onSubmit}
          name={props.name}
          className="popup__wrapper"
        >
          <h2 className="popup__title">{props.title}</h2>

          {props.children}

          <button name="saved" type="submit" className="popup__btn">
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
