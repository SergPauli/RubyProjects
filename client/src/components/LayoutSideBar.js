import { Component } from "react"
import avatar from "../images/logo.svg"
export class LayoutSideBar extends Component {
  constructor(props) {
    super(props)
    this.title = props.title
  }
  
  render() {
    return (
      <div className="layout-sidebar">
        <a className="logo" href="#/">
          <img id="app-logo" className="logo-image" src={avatar} alt="diamond layout" />
          <span className="app-name">МЕДСС</span>
        </a>
        <div className="layout-menu-container">
          <ul className="layout-menu" role="menu">
            <li className="layout-root-menuitem" role="menuitem">
              <button type="button" className="p-ripple p-link">
                <i className="layout-menuitem-icon pi pi-fw pi-home"></i>
                <span className="layout-menuitem-text">Favorites</span>
                <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>
              </button>
              <div className="layout-root-menuitem">
                <div className="layout-menuitem-root-text" style={{ textTransform: "uppercase" }}>
                  Избранное
                </div>
              </div>
              <ul className="layout-menu" role="menu">
                <li role="menuitem">
                  <a className="p-ripple" href="/">
                    <i className="layout-menuitem-icon pi pi-fw pi-home"></i>
                    <span className="layout-menuitem-text">Главная</span>
                  </a>
                </li>
              </ul>
            </li>
            <li class="layout-root-menuitem" role="menuitem">
              <button type="button" class="p-ripple p-link">
                <i class="layout-menuitem-icon pi pi-fw pi-id-card"></i>
                <span class="layout-menuitem-text">Операции</span>
                <i class="pi pi-fw pi-angle-down layout-submenu-toggler"></i>
              </button>
              <div class="layout-root-menuitem">
                <div class="layout-menuitem-root-text" style={{ textTransform: "uppercase" }}>
                  Операции
                </div>
              </div>
              <ul class="layout-menu" role="menu">                
                <li class="" role="menuitem">
                  <a class="p-ripple active-route" href="/list" aria-current="page">
                    <i class="layout-menuitem-icon pi pi-fw pi-list"></i>
                    <span class="layout-menuitem-text">Список</span>
                  </a>
                </li>                
              </ul>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
