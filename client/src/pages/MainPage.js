import React, { Component } from 'react'
import WrappedLayoutTopBar from '../components/LayoutTopBar'
import { LayoutSideBar } from "../components/LayoutSideBar"
import { connect } from 'react-redux'


export class MainPage extends Component {
  constructor(props) {
    super(props)  
   
    this.title = "Главная"
  }
  componentDidMount() {
    document.title = "МедСС:" + this.title
  }
  render() {
    const { isLayoutStaticInactive, isTabletOrMobile } = this.props
    
    return (
      <div
        className={
          "layout-wrapper layout-static p-ripple-disabled layout-sidebar-indigo" +
          (isLayoutStaticInactive ? (isTabletOrMobile ? " layout-mobile-active" : " layout-static-inactive") : "")
        }
        data-theme="light"
      >
        <div className="layout-content-wrapper">
          <WrappedLayoutTopBar title={this.title} />
          <div className="layout-content">
            <h1>MainPage</h1>
          </div>
          <div className="layout-footer">
            <div className="footer-logo-container">
              <span className="app-name">Медицинское свидетельство о смерти</span>
            </div>
            <span className="copyright">© АМИАЦ - 2020</span>
          </div>
          <LayoutSideBar />
        </div>
        <div class="layout-mask modal-in"></div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {  
  return { isLayoutStaticInactive: state.layout.isLayoutStaticInactive, isTabletOrMobile: state.layout.isTabletOrMobile }
}

const WrappedMainPage = connect(mapStateToProps,null)(MainPage)
export default WrappedMainPage