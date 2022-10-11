import React from "react";
import Header from "./Header";
import { Link, withRouter } from "react-router-dom";
import * as auth from '../utils/auth.js'
import successImage from '../images/success.svg';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    auth.register(this.state.password, this.state.email)
      .then(() => {
        this.props.history.push('/sign-in');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.props.onLogin();
        this.props.onUpdateInfoMessage({
          image: successImage,
          description: 'Вы успешно зарегистрировались!'
        });
      });
  }

  render() {
    return (
      <div className="register">
        <form
          name="register"
          className="register__form"
          onSubmit={this.handleSubmit}
        >
          <h2 className="register__title">Регистрация</h2>

          <input id="email" name="email" type="email" placeholder="Email" className="popup__input register__input" value={this.state.email} onChange={this.handleChange} required />
          <input id="password" name="password" type="password" placeholder="Пароль" className='popup__input register__input' value={this.state.password} onChange={this.handleChange} required />

          <button name="submit" className='popup__button-save register__button' type="submit" aria-label="Войти">Зарегистрироваться</button>
          <p className="register__signin">Уже зарегестрированы?
            <Link to="/sign-in" className="register__login-link"> Войти</Link>
          </p>
        </form>
      </div>
    );
  }
}

export default withRouter(Register);