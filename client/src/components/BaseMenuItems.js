import { Component } from "react"
export default class BaseMenuItems extends Component {
  constructor(props) {
    super(props)
    this.itemClass = props.itemClass
    this.menuClass = props.menuClass
  }

  getButtonBody(icon, label) {
    return icon ? ([<i className={icon}></i>, <span >{label}</span>]) : 
    (<span>{label}</span>)
  }
  createMenuLi(icon, label, options, needTabIndex, key) {    
    const liItem = (
      <li role="menuitem" key={key}>
        {needTabIndex ? (
          <button type="button" className="p-link" tabIndex="0" onClick={options.onClick}>
            {this.getButtonBody(icon, label, options)}
          </button>
        ) : (
          <button type="button" className="p-link" onClick={options.onClick}>
            {this.getButtonBody(icon, label, options)}
          </button>
        )}
      </li>
    )
    return liItem
  }
}
