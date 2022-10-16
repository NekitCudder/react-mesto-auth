import React from 'react';
import { Route, Switch, Link, useHistory } from "react-router-dom";
import logo from '../images/logo.svg';

function Header({ email, setEmail }) {
  const history = useHistory();

  function signOut() {
    localStorage.removeItem('jwt');
    history.push('/sign-in');
    setEmail('');
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место" />
      <Switch>
        <Route exact path='/'>
          <div className='header__nav'>
            <p className='header__email'>{email}</p>
            <button type='button' className='header__button header__auth' onClick={signOut}>Выйти</button>
          </div>
        </Route >
        <Route path='/sign-in'>
          <Link className='header__auth' to='sign-up'>
            Регистрация
          </Link>
        </Route>
        <Route path='/sign-up'>
          <Link className='header__auth' to='sign-in'>
            Войти
          </Link>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;