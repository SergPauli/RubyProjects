
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
      <i className={icon}></i>,
      <div className={this.itemClass + "-item"}>
        <div className={this.itemClass + "-summary"}>{label}</div>
        <div className={this.itemClass + "-detail"}>{options.detail}</div>
      </div>,
    ]
  }

  render() {
    const dataList = {
      isfadeInDown: false,
      buttonLabel: <span className="topbar-badge">5</span>,
      buttonChildNode: <i className="pi pi-bell"></i>,
      ChildLiList: [
        this.createMenuLi(
          "pi pi-check-square",
          "Готовность",
          { detail: [<strong>2</strong>, " не отправленных"] },
          true,
          "notCo3689"
        ),
        this.createMenuLi(
          "pi pi-plus-circle",
          "Новые",
          { detail: ["Добавлено ", <strong>3</strong>, "  свид"] },
          false,
          "newIt589"
        ),
        this.createMenuLi("pi pi-comments", "Комменты", { detail: ["новых ", <strong>2</strong>] }, false, "comments"),
      ],
    }
    return <MenuItem data={dataList} menuClassName={this.menuClass} />
  }
}

const WrappedNotifications = connect()(Notifications)
export default WrappedNotifications
