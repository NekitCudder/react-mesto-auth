import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = ({ onRegister }) => {
  const [state, setState] = useState({
    password: '',
    email: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, email } = state;
    onRegister(password, email);
  }

  return (
    <div className="register">
      <form
        name="register"
        className="register__form"
        onSubmit={handleSubmit}
      >
        <h2 className="register__title">Регистрация</h2>

        <input id="email" name="email" type="email" placeholder="Email" className="popup__input register__input" value={state.email || ''} onChange={handleChange} required />
        <input id="password" name="password" type="password" placeholder="Пароль" className='popup__input register__input' value={state.password || ''} onChange={handleChange} required />

        <button name="submit" className='popup__button-save register__button' type="submit" aria-label="Войти">Зарегистрироваться</button>
        <p className="register__signin">Уже зарегестрированы?
          <Link to="/sign-in" className="register__login-link"> Войти</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;