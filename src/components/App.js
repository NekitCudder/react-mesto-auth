import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Main from './Main';
import Footer from './Footer';
import Register from './Register';
import Login from './Login';
import Header from './Header';
import ProtectedRoute from './ProtectedRoute';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup ';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import * as auth from '../utils/auth.js'
import errorImage from '../images/error.svg';
import successImage from '../images/success.svg';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [infoMessage, setInfoMessage] = React.useState({ image: '', description: '' });
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  let history = useHistory();

  function handleLogin(password, email) {
    auth.authorize(password, email)
      .then((res) => {
        console.log(res);
        setEmail(email);
        setLoggedIn(true);
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        handleInfoTooltipPopupOpen();
        setInfoMessage({
          image: errorImage,
          description: 'Что-то пошло не так! Попробуйте ещё раз.'
        });
      });
  }

  function handleRegister(password, email) {
    auth.register(password, email)
      .then((res) => {
        console.log(res);     
        handleInfoTooltipPopupOpen();
        setInfoMessage({
          image: successImage,
          description: 'Вы успешно зарегистрировались!'
        });
        history.push('/sign-in');
      })
      .catch((err) => {
        console.log('Ошибка регистрации', err);
        handleInfoTooltipPopupOpen();
        setInfoMessage({
          image: errorImage,
          description: 'Что-то пошло не так! Попробуйте ещё раз.'
        });
      });
  }

  const checkToken = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setEmail(res.data.email);
            setLoggedIn(true);
            history.push('/');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  React.useEffect(() => {
    checkToken();
  }, [])

  //загрузка данных пользователя
  React.useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
        .then((item) => {
          setCurrentUser(item);
        })
        .catch((err) => {
          console.log(`Ошибка загрузки данных пользователя с сервера: ${err}`);
        });
    }
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  function handleInfoTooltipPopupOpen() {
    setInfoTooltipPopupOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setInfoTooltipPopupOpen(false);
    setSelectedCard(null);
  }
  function onCardClick(card) {
    setSelectedCard(card);
  }

  //функция редактирования данных пользователя
  function handleUpdateUser(data) {
    api.editUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка редактирования данных пользователя: ${err}`);
      });
  }

  //фнукция загрузки аватара
  function handleUpdateAvatar(data) {
    api.editAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка загрузки нового аватара: ${err}`);
      });
  }

  //функция добавления новой карточки
  function handleAddPlaceSubmit(data) {
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка добавления новой карточки: ${err}`);
      });
  }

  //загрузка карточек с сервера
  React.useEffect(() => {
    if (loggedIn) {
      api.getInitialCards()
        .then((data) => {
          setCards(data)
        })
        .catch((err) => {
          console.log(`Ошибка загрузки карточек с сервера: ${err}`);
        });
    }
  }, [loggedIn]);

  //функция лайка карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`Ошибка лайка карточки: ${err}`);
      });
  }

  //функция удаления карточки пользователя
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка удаления карточки пользователя: ${err}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header email={email} setEmail={setEmail}/>

        <Switch>
          <ProtectedRoute
            exact path='/'
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={onCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

          <Route path='/sign-in'>
            <Login onInfoTooltip={handleInfoTooltipPopupOpen} onLogin={handleLogin} />
          </Route>

          <Route path='/sign-up'>
            <Register onInfoTooltip={handleInfoTooltipPopupOpen} onRegister={handleRegister} />
          </Route>

          <ProtectedRoute>
            {loggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}
          </ProtectedRoute>

        </Switch>

        <Footer />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} infoMessage={infoMessage} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;
