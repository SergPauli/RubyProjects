import { Component } from "react"
const shortid = require("shortid")  

export default class BaseMenuItems extends Component {
  constructor(props) {
    super(props)
    this.itemClass = props.itemClass
    this.menuClass = props.menuClass
  }

  getButtonBody(icon, label) {
    return icon ? (
      [<i key={shortid.generate()} className={icon}></i>, <span key={shortid.generate()}>{label}</span>]
    ) : (
      <span key={shortid.generate()}>{label}</span>
    )
  }
  createMenuLi(icon, label, options, needTabIndex) {     
    const liItem = (
      <li role='menuitem' key={shortid.generate()}>
        {needTabIndex ? (
          <button type='button' className='p-link' tabIndex='0' onClick={options.onClick}>
            {this.getButtonBody(icon, label, options)}
          </button>
        ) : (
          <button type='button' className='p-link' onClick={options.onClick}>
            {this.getButtonBody(icon, label, options)}
          </button>
        )}
      </li>
    )
    return liItem
  }
}
