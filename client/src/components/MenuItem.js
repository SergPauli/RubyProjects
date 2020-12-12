

const { Component } = require("react")

class MenuItem extends Component {
  constructor(props) {
    super(props)
    this.menuClassName = props.menuClassName
    this.isfadeInDown = this.props.data.isfadeInDown
    this.state = { active: "" }
    this.key = props.key 
    this.itemOnClick = this.itemOnClick.bind(this)
    this.setWrapperRef = this.setWrapperRef.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }
  
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside)    
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside)
  }
  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node
  }

  /**
   * handler if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ active: "" })
    }
  }
  /**
   * handler if clicked on menubutton
   */
  itemOnClick() {
    this.setState({
      active: this.state.active === "" ? " active-menuitem" + (this.isfadeInDown ? " fadeInDown" : "") : "",
    })
  }
  render() {
    const { buttonLabel, buttonChildNode, ChildLiList } = this.props.data

    const liClassList = `${this.menuClassName}-item${this.state.active}`
    const ulClassList = `${this.menuClassName}-menu fade-in-up`
    return (
      <li className={liClassList} ref={this.setWrapperRef} key={this.key}>
        <button type="button" className="p-link" onClick={this.itemOnClick}>
          {buttonChildNode}
          {buttonLabel}
        </button>
        <ul className={ulClassList}>{ChildLiList}</ul>
      </li>
    )
  }
}
export default MenuItem
