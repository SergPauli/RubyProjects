import React, { Component } from 'react'
import "../styles/layout-light.css"
import logo from "../images/security.png" // relative path to image
import { Toast } from 'primereact/toast'
import { Password } from 'primereact/password'
import { InputText } from "primereact/inputtext"
import { AuthService } from '../service/authService'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actionLogin} from '../redux/action'
import Cookies from "universal-cookie";

class LoginPage extends Component {
  constructor(props) {
    super(props)      
    this.state = { username: "", password: ""}
    this.showError = this.showError.bind(this)
    this.authService = new AuthService()
    this.login = this.login.bind(this)
  }
  
  showError(detail) {
    this.toast.show({
      severity: "error",
      summary: "Ошибка авторизации",
      detail: detail });
  }

  login() {
    const {actionLogin} = this.props 
    const cookies = new Cookies();
    this.authService
      .login(this.state.username, this.state.password)
      .then((data) => {        
        actionLogin(data)        
        cookies.set("auth", data)
      })
      .catch((error) => { this.showError(error.message.indexOf("401")===-1 ? 
        error.message : 'учетные данные не верны' )
        error = undefined
    });
  }
  render() {     
    return (       
      <div>
        <Toast ref={(el) => (this.toast = el)}></Toast>
        <div className="login-body">
          <div className="login-wrapper">
            <div className="login-panel">
              <img src={logo} className="logo" alt="medstatpicture" />
              <div className="login-form">
                <h2>Вход в систему</h2>
                <p>
                  Не зарегистрированы?<a href="/">Оставить заявку</a>
                </p>
                <InputText
                  id="username"
                  placeholder="Логин (28ХХХХ_ХХ)"
                  value={this.state.username}
                  className="p-inputtext p-component"
                  onChange={(e) => this.setState({ username: e.target.value })}
                />

                <Password
                  feedback = {false}
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                  placeholder="Пароль"
                  className="p-inputtext p-component"
                />
                <button
                  type="button"
                  className="p-button p-component"
                  onClick={this.login}
                >
                  <span className="p-button-label p-c">ВОЙТИ</span>
                </button>
              </div>
              <p>
                Есть проблемы?<a href="/">Кликнуть здесь</a> для поддержки.
              </p>
            </div>
            <div className="login-image">
              <div className="login-image-content">
                <h1>Медицинское</h1>
                <h1>свидетельство</h1>
                <h1>о смерти</h1>
                <h3>
                  доступ к системе возможен только
                  <br />
                  после авторизации
                </h3>
              </div>
              <div className="image-footer">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <div className="icons">
                  <i className="pi pi-github"></i>
                  <i className="pi pi-twitter"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapActionToProps = (dispatch) => {
   return {actionLogin: bindActionCreators(actionLogin, dispatch)} 
}


const WrappedLoginPage = connect(null, mapActionToProps)(LoginPage);
export default WrappedLoginPage