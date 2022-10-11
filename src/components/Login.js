import React from "react";
import Header from "./Header";
import { Link, withRouter } from "react-router-dom";
import * as auth from "../utils/auth.js";
import errorImage from '../images/error.svg';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: ''
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
    auth.authorize(this.state.password, this.state.email)
      .then((res) => {
        if (res) {
          this.setState({ password: '', email: '' }, () => {
            this.props.handleLogin();
            this.props.history.push('/');
          })
        }
        else {
          this.props.onLogin();
          this.props.onUpdateInfoMessage({
            image: errorImage,
            description: 'Что-то пошло не так! Попробуйте ещё раз.'
          });
        }
      })
      .catch((err) => {
        console.log(err);
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
          <h2 className="register__title">Вход</h2>

          <input id="email" name="email" type="email" placeholder="Email" className="popup__input register__input" value={this.state.email} onChange={this.handleChange} required />
          <input id="password" name="password" type="password" placeholder="Пароль" className='popup__input register__input' value={this.state.password} onChange={this.handleChange} required />

          <button name="submit" className='popup__button-save register__button' type="submit" aria-label="Войти">Войти</button>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);