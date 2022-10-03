import PopupWithForm from './PopupWithForm';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title='Редактировать профиль'
      name='edit-profile'
      buttonText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <div className="popup__container-input">
        <input id="popup__profile" type="text" name="name" className="popup__input popup__input_text_name"
          placeholder="введите имя" minLength="2" maxLength="40" required value={name} onChange={handleNameChange} />
        <span className="popup__error popup__profile-error"></span>
      </div>
      <div className="popup__container-input">
        <input id="popup__caption" type="text" name="about" className="popup__input popup__input_text_caption"
          placeholder="введите деятельность" minLength="2" maxLength="200" required value={description} onChange={handleDescriptionChange} />
        <span className="popup__caption-error popup__error"></span>
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup;

