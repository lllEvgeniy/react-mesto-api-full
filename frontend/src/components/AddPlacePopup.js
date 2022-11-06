import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setTitle("");
    setLink("");
  }, [props.isOpen]);

  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      title,
      link,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      buttonText="Создать"
      onClose={props.onClose}
      isOpen={props.isOpen}
      name="edit-pictures"
      title="Новое место"
    >
      <input
        value={title || ""}
        onChange={handleChangeTitle}
        minLength="2"
        maxLength="30"
        className="popup__input popup__input_title"
        required
        placeholder="Название"
        name="name"
        type="text"
      />
      <span className="popup__message-error popup__message-error_name">
        Вы пропустили это поле.
      </span>
      <input
        value={link || ""}
        onChange={handleChangeLink}
        required
        placeholder="Ссылка на картинку"
        name="link"
        type="url"
        className="popup__input popup__input_link"
      />
      <span className="popup__message-error popup__message-error_link">
        Вы пропустили это поле.
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
