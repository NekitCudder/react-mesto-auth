function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_open-card ${card && 'popup_opened'}`}>
      <div className="popup__container-image">
        <figure className="popup__figure">
          <img className="popup__image" src={card?.link} alt={card?.name} />
          <h3 className="popup__sub">{card?.name}</h3>
        </figure>
        <button type="button" aria-label="Close" className="popup__button-close" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default ImagePopup;