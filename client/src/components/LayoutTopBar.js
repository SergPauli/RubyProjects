import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionSideBarToggle } from "../redux/action";
import WrappedNotifications from "./Notifications";
import WrappedProfileMenuItem from "./ProfileMenuItem";

const { Component } = require("react");

export class LayoutTopBar extends Component {
  constructor(props) {
    super(props)
    this.title = props.title    
    this.menuToggle = this.menuToggle.bind(this)
  }
  
  menuToggle() { 
    const { actionSideBarToggle, isLayoutStaticInactive} = this.props   
    actionSideBarToggle(!isLayoutStaticInactive)
  }
  render() {
    return (
      <div className="layout-topbar">
        <div className="topbar-left">
          <button type="button" className="menu-button p-link" onClick={this.menuToggle}>
            <i className="pi pi-chevron-left"></i>
          </button>
          <span className="topbar-separator"></span>
          <div className="layout-breadcrumb viewname">
            <span>{this.title}</span>
          </div>
        </div>
        <div className="topbar-right">
          <ul className="topbar-menu">
            <li className="search-item" key="0566">
              <button type="button" className="p-link">
                <i className="pi pi-search"></i>
              </button>
            </li>
            <WrappedNotifications key="0569" />
            <WrappedProfileMenuItem key="0586" />
            <li className="right-sidebar-item" key="0596">
              <button type="button" className="p-link">
                <i className="pi pi-align-right"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
const mapActionToProps = (dispatch) => {
  return { actionSideBarToggle: bindActionCreators(actionSideBarToggle, dispatch) }
}
const mapStateToProps = (state) => {
  return { isLayoutStaticInactive: state.layout.isLayoutStaticInactive }
}
const WrappedLayoutTopBar = connect(mapStateToProps, mapActionToProps)(LayoutTopBar)
export default WrappedLayoutTopBar