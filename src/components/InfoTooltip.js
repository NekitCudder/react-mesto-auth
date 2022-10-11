function InfoTooltip({ isOpen, onClose, infoMessage }) {
  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container popup__infotool">
        <img className=" popup__infotool-image" src={infoMessage.image} alt={infoMessage.description} />
        <h2 className="popup__title popup__infotool-title">{infoMessage.description}</h2>
        <button type="button" aria-label="Close" className="popup__button-close" onClick={onClose} />
      </div>
    </div>
  )
}
export default InfoTooltip;