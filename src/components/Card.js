import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id !== currentUser._id;

  const cardDeleteButtonClassName =
    `cards__button-delete ${isOwn && 'cards__button-delete_hidden'}`;

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName =
    `cards__button-like ${isLiked && 'cards__button-like_active'}`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="cards__item">
      <img className="cards__image" src={card.link} alt={card.name} onClick={handleCardClick} />
      <button type="button" aria-label="Trash" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <div className="cards__caption">
        <h2 className="cards__title">{card.name}</h2>
        <div className="cards__like">
          <button type="button" aria-label="Like" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <p className="cards__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}
export default Card;