import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from "react";

function EditAvatarPopup(props) {
  const AvatarRef = useRef();
  function handleClick(e) {
    e.preventDefault();
    props.onUpdateAvatar(AvatarRef.current.value);
  }

  useEffect(() => {
    AvatarRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleClick}
      buttonText="Сохранить"
      name="edit-avatar"
      title="Обновить аватар"
    >
      <input
        ref={AvatarRef}
        type="url"
        required
        className="popup__input"
        placeholder="Ссылка на ваш аватар"
        name="avatar"
      />
      <span className="popup__message-error popup__message-error_avatar"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
