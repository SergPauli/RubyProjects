import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import ava from "../images/ava.png"
import { actionLogout } from "../redux/action"
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
    const { actionLogout } = this.props
    this.authService.logout().then((data) => {
      actionLogout()
    })
  }

  render() {
    const { username, isTabletOrMobile } = this.props   
      const dataList = {
        isfadeInDown: true,
        buttonLabel:  (isTabletOrMobile)? "" : username,
        buttonChildNode: <img src={ava} alt="diamond-layout" className="profile-image" />,
        ChildLiList: [
          this.createMenuLi("pi pi-user", "Профиль", {}, true, "prof8956"),
          this.createMenuLi("pi pi-cog", "Настройки", {}, false, "set333"),
          this.createMenuLi("pi pi-inbox", "Сообщения", {}, false, "inBox"),
          this.createMenuLi("pi pi-power-off", "Выход", { onClick: this.logout }, false, "logout"),
        ],
      }
    return <MenuItem data={dataList} menuClassName={this.menuClass} />
  }
}
const mapActionToProps = (dispatch) => {
  return { actionLogout: bindActionCreators(actionLogout, dispatch) }
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.name,
    isTabletOrMobile: state.layout.isTabletOrMobile
  }
}

const WrappedProfileMenuItem = connect(mapStateToProps, mapActionToProps)(ProfileMenuItem)
export default WrappedProfileMenuItem