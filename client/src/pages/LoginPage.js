import React, { Component } from 'react'
import "../styles/layout-light.css"
import logo from "../images/security.png" // relative path to image
import { Password } from 'primereact/password'
import { InputText } from "primereact/inputtext"
import { AuthService } from '../service/authService'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Toast } from "primereact/toast"
import { actionLogin, actionPutMessage, actionClearStatus, actionSetLoading } from "../redux/action"

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = { username: "", password: "" }
    this.showError = this.showError.bind(this)
    this.authService = new AuthService()    
    this.login = this.login.bind(this)
  }
  componentDidMount() {
    document.title = "МедСС: Вход в систему"
    const { actionClearStatus, message } = this.props       
    if (message) {
      this.toast.show(message)
      actionClearStatus()
    }
  }
  showError(detail) {
    this.toast.show({
      severity: "error",
      summary: "Ошибка авторизации",
      detail: detail,
    })
  }
  login() {
    const { actionLogin, actionPutMessage, actionSetLoading } = this.props
    actionSetLoading()
    this.authService
      .login(this.state.username, this.state.password)
      .then((data) => {
        actionLogin(data)
        actionPutMessage({
          severity: "success",
          summary: "Выполнен вход в систему",
          detail: data.name + " : " + data.hospital_name,
        })
        actionSetLoading()
      })
      .catch((error) => {
        this.showError(error.message.indexOf("401") === -1 ? error.message : "учетные данные неверны")
        error = undefined
        actionSetLoading()
      })
  }
  render() {
    const { isLoading } = this.props
    return (
      <div className='login-body'>
        <Toast ref={(el) => (this.toast = el)}></Toast>
        <div className='login-wrapper'>
          <div className='login-panel'>
            <img src={logo} className='logo' alt='medstatpicture' />
            <div className='login-form' style={{ display: isLoading ? "none" : "" }}>
              <h2>Вход в систему</h2>
              <p>
                Не зарегистрированы?<a href='/'>Оставить заявку</a>
              </p>
              <InputText
                id='username'
                placeholder='Логин (28ХХХХ_ХХ)'
                value={this.state.username}
                className='p-inputtext p-component'
                onChange={(e) => this.setState({ username: e.target.value })}
              />

              <Password
                feedback={false}
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
                placeholder='Пароль'
                className='p-inputtext p-component'
              />
              <button type='button' className='p-button p-component' onClick={this.login}>
                <span className='p-button-label p-c'>ВОЙТИ</span>
              </button>
            </div>
            <div
              className='p-progress-spinner login-form'
              role='alert'
              aria-busy='true'
              style={{ display: isLoading ? "" : "none" }}
            >
              <svg className='p-progress-spinner-svg' viewBox='25 25 50 50' style={{ animationDuration: "2s;" }}>
                <circle
                  className='p-progress-spinner-circle'
                  cx='50'
                  cy='50'
                  r='20'
                  fill='none'
                  stroke-width='2'
                  stroke-miterlimit='10'
                ></circle>
              </svg>
            </div>
            <p>
              Есть проблемы?<a href='/'>Кликнуть здесь</a> для поддержки.
            </p>
          </div>
          <div className='login-image'>
            <div className='login-image-content'>
              <h1>Медицинское</h1>
              <h1>свидетельство</h1>
              <h1>о смерти</h1>
              <h3>
                доступ к системе возможен только
                <br />
                после авторизации
              </h3>
            </div>
            <div className='image-footer'>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <div className='icons'>
                <i className='pi pi-github'></i>
                <i className='pi pi-twitter'></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

 
const mapStateToProps = state => { 
  return { message: state.message, isLoading: state.layout.isLoading }
}  

const mapActionToProps = (dispatch) => {
   return {
     actionLogin: bindActionCreators(actionLogin, dispatch),
     actionPutMessage: bindActionCreators(actionPutMessage, dispatch),
     actionClearStatus: bindActionCreators(actionClearStatus, dispatch),
     actionSetLoading: bindActionCreators(actionSetLoading, dispatch),
   } 
}


const WrappedLoginPage = connect(mapStateToProps, mapActionToProps)(LoginPage)
export default WrappedLoginPage