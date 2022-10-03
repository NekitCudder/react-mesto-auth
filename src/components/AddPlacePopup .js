import PopupWithForm from './PopupWithForm';
import React from 'react';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      title='Новое место'
      name='add-card'
      buttonText='Добавить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__container-input">
        <input id="popup__card" type="text" name="name" className="popup__input popup__name-card" placeholder="Название"
          minLength="2" maxLength="30" required value={name} onChange={handleNameChange} />
        <span className="popup__error popup__card-error"></span>
      </div>
      <div className="popup__container-input">
        <input id="popup__url" type="url" name="link" className="popup__input popup__link-card"
          placeholder="Ссылка на картинку" required value={link} onChange={handleLinkChange} />
        <span className="popup__url-error popup__error"></span>
      </div>
    </PopupWithForm>
  )
}
export default AddPlacePopup;