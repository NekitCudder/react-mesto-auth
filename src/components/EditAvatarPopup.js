import PopupWithForm from './PopupWithForm';
import React from 'react';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    avatarRef.current.value = "";
  }

  return (
    <PopupWithForm
      title='Обновить аватар'
      name='change-avatar'
      buttonText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <div className="popup__container-input">
        <input id="popup__url-ava" type="url" name="avatar" className="popup__input popup__link-ava"
          placeholder="Ссылка на аватар" required ref={avatarRef} />
        <span className="popup__error popup__url-ava-error"></span>
      </div>
    </PopupWithForm>
  )



}
export default EditAvatarPopup;