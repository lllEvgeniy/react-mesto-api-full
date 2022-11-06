function ImagePopup(props) {
  const className = `popup popup_type_image ${
    props.card._id && "popup_active"
  }`;

  return (
    <div className={className}>
      <figure className="popup__cover">
        <button
          onClick={props.onClose}
          type="button"
          className="popup__close popup__close_img"
        ></button>
        <img
          src={props.card.link}
          className="popup__image"
          alt={props.card.name}
        />
        <figcaption className="popup__signature">{props.card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
