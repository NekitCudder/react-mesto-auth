import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from './Card';

const Main = ({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete }) => {
  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar-info">
            <img className="profile__avatar" src={currentUser.avatar} alt="Аватар профиля" />
            <button type="button" aria-label="Edit" className="profile__avatar-edit" onClick={onEditAvatar}>
            </button>
          </div>
          <div className="profile__date">
            <div className="profile__name-edit">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button type="button" aria-label="Edit" className="profile__button-edit" onClick={onEditProfile}>
              </button>
            </div>
            <p className="profile__caption">{currentUser.about}</p>
          </div>
        </div>
        <button type="button" aria-label="Add" className="profile__button-add" onClick={onAddPlace}>
        </button>
      </section>

      <section className="elements">
        <ul className="cards">
          {cards.map((item) => {
            return <Card card={item} key={item._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />;
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;