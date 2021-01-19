import { connect} from "react-redux"
import { bindActionCreators} from "redux"
import ava from "../images/ava.png"
import { actionLogout, actionPutMessage, actionSetLoading } from "../redux/action"
import { AuthService } from "../service/authService"
import BaseMenuItems from "./BaseMenuItems"
import MenuItem from "./MenuItem"


class ProfileMenuItem extends BaseMenuItems {
  constructor(props) {
    super(props)
    this.menuClass = "profile"
    this.authService = new AuthService()
    this.logout = this.logout.bind(this)
  }

  logout() {
     const { actionPutMessage, actionLogout, token, actionSetLoading } = this.props 
     actionSetLoading()      
     this.authService.logout(token).then((data) => {      
      actionPutMessage({
        severity: "success",
        summary: "Сеанс завершен",
        detail: data.message,
      })
      actionLogout(token)
      actionSetLoading()                           
    })
    .catch(error=>{
      actionPutMessage({
        severity: "error",
        summary: "Ошибка",
        detail: error.message,
      })
      actionLogout(token)
      actionSetLoading()
    }) 
  }

  render() {
    const { username, isTabletOrMobile } = this.props   
      const dataList = {
        isfadeInDown: true,
        buttonLabel:  (isTabletOrMobile)? "" : username,
        buttonChildNode: <img src={ava} alt="diamond-layout" className="profile-image" />,
        ChildLiList: [
          this.createMenuLi("pi pi-user", "Профиль", {}, true, "p88"),
          this.createMenuLi("pi pi-cog", "Настройки", {}, false, "s737"),
          this.createMenuLi("pi pi-inbox", "Сообщения", {}, false, "i789"),
          this.createMenuLi("pi pi-power-off", "Выход", {onClick: this.logout}, false, "l789"),
        ],
      }
    return <MenuItem data={dataList} menuClassName={this.menuClass} key='P01' />
  }
}
const mapActionToProps = (dispatch) => {
  return {
    actionLogout: bindActionCreators(actionLogout, dispatch),
    actionPutMessage: bindActionCreators(actionPutMessage, dispatch),
    actionSetLoading: bindActionCreators(actionSetLoading, dispatch),
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.name,
    token: state.auth.token,
    isTabletOrMobile: state.layout.isTabletOrMobile
  }
}

const WrappedProfileMenuItem = connect(mapStateToProps, mapActionToProps)(ProfileMenuItem)
export default WrappedProfileMenuItem