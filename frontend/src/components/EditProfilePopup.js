import PopupWithForm from "./PopupWithForm";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
      <PopupWithForm
        onSubmit={handleSubmit}
        buttonText="Сохранить"
        onClose={props.onClose}
        isOpen={props.isOpen}
        name="edit-profile"
        title="Редактировать профиль"
      >
        <input
          value={name || ""}
          onChange={handleChangeName}
          minLength="2"
          maxLength="40"
          required
          className="popup__input popup__input_name"
          placeholder="Введите ваше имя"
          name="title"
          type="text"
        />
        <span className="popup__message-error popup__message-error_title"></span>
        <input
          value={description || ""}
          onChange={handleChangeDescription}
          minLength="2"
          maxLength="200"
          required
          placeholder="Чем вы заниметесь"
          name="subtitle"
          type="text"
          className="popup__input popup__input_occupation"
        />
        <span className="popup__message-error popup__message-error_subtitle"></span>
      </PopupWithForm>
  );
}

export default EditProfilePopup;
