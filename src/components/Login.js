import { useState } from 'react';

const Login = ({ onLogin }) => {
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
    onLogin(password, email);
  }

  return (
    <div className="register">
      <form
        name="register"
        className="register__form"
        onSubmit={handleSubmit}
      >
        <h2 className="register__title">Вход</h2>

        <input id="email" name="email" type="email" placeholder="Email" className="popup__input register__input" value={state.email || ''} onChange={handleChange} required />
        <input id="password" name="password" type="password" placeholder="Пароль" className='popup__input register__input' value={state.password || ''} onChange={handleChange} required />

        <button name="submit" className='popup__button-save register__button' type="submit" aria-label="Войти">Войти</button>
      </form>
    </div>
  );
}

export default Login;