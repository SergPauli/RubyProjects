
import { connect } from "react-redux"
import BaseMenuItems from "./BaseMenuItems"
import MenuItem from "./MenuItem"
 

class Notifications extends BaseMenuItems {
  constructor(props) {
    super(props)
    this.itemClass = "notification"
    this.menuClass = "notifications"
  }

  getButtonBody(icon, label, options) {
    return [
      <i key='775' className={icon}></i>,
      <div key='776' className={this.itemClass + "-item"}>
        <div key='777' className={this.itemClass + "-summary"}>
          {label}
        </div>
        <div key='778'  className={this.itemClass + "-detail"}>
          {options.detail}
        </div>
      </div>,
    ]
  }

  render() {
    const dataList = {
      isfadeInDown: false,
      buttonLabel: <span className='topbar-badge'>5</span>,
      buttonChildNode: <i key='075' className='pi pi-bell'></i>,
      ChildLiList: [
        this.createMenuLi(
          "pi pi-check-square",
          "Готовность",
          { detail: [<strong key='1'>2</strong>, " не отправленных"] },
          true
        ),
        this.createMenuLi(
          "pi pi-plus-circle",
          "Новые",
          { detai: ["Добавлено ", <strong key='2'>3</strong>, "  свид"] },
          false
        ),
        this.createMenuLi("pi pi-comments", "Комменты", { detail: ["новых ", <strong key='3'>2</strong>] }, false),
      ],
    }
    return <MenuItem data={dataList} menuClassName={this.menuClass} key='N01' />
  }
}

const WrappedNotifications = connect()(Notifications)
export default WrappedNotifications
