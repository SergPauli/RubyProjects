import { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { actionSideBarToggle, actionClearStatus } from "../redux/action"
import { LayoutFooter } from "./LayoutFooter"
import { LayoutSideBar } from "./LayoutSideBar"
import { Toast } from "primereact/toast"
import WrappedLayoutTopBar from "./LayoutTopBar"

export class Layout extends Component {
  constructor(props) {
    super(props)
    this.menuHide = this.menuHide.bind(this)
    this.title = this.props.title
  }
  menuHide() {
    const { actionSideBarToggle, isLayoutStaticInactive } = this.props
    actionSideBarToggle(!isLayoutStaticInactive)
  }
  componentDidMount() {
    document.title = "МедСС:" + this.title
    this.showMessage()
  }
  showMessage() { 
    const { actionClearStatus, message, isLoading } = this.props 
    if (message && !isLoading) {
      this.toast.show(message)
      actionClearStatus()
    }    
  }
  componentDidUpdate() {
    this.showMessage()   
  }
  render() {
    const { isLayoutStaticInactive, isTabletOrMobile, content } = this.props
    return (
      <div
        className={
          "layout-wrapper layout-static p-ripple-disabled layout-sidebar-indigo" +
          (isLayoutStaticInactive ? (isTabletOrMobile ? " layout-mobile-active" : " layout-static-inactive") : "")
        }
        data-theme='light'
      >
        <div className='layout-content-wrapper'>
          <WrappedLayoutTopBar title={this.title} />
          <div className='layout-content'>{content}</div>
          <LayoutFooter />
        </div>
        <LayoutSideBar />
        <Toast ref={(el) => (this.toast = el)}></Toast>
        <div className='layout-mask modal-in' onClick={this.menuHide}></div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    isLayoutStaticInactive: state.layout.isLayoutStaticInactive,
    isTabletOrMobile: state.layout.isTabletOrMobile,
    isLoading: state.layout.isLoading,
    message: state.message
  }
}
const mapActionToProps = (dispatch) => {
  return {
    actionSideBarToggle: bindActionCreators(actionSideBarToggle, dispatch),
    actionClearStatus: bindActionCreators(actionClearStatus, dispatch),
  }
}
const WrappedLayout = connect(mapStateToProps, mapActionToProps)(Layout)
export default WrappedLayout
