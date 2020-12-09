import React from 'react'
import WrappedProfileMenu from '../components/ProfileMenu';
import avatar from "../images/medical.svg";
export default function MainPage(){
    return (
      <div className="layout-content-wrapper">
        <div className="layout-topbar">
          <div className="topbar-left">
            <button type="button" className="menu-button p-link">
              <i className="pi pi-chevron-left"></i>
            </button>
            <span className="topbar-separator"></span>
            <div className="layout-breadcrumb viewname">
              <span>Главная</span>
            </div>
            <img
              id="logo-mobile"
              className="mobile-logo"
              src="assets/layout/images/logo-dark.svg"
              alt="diamond-layout"
            />
          </div>
          <div className="topbar-right">
            <ul className="topbar-menu">
              <li className="search-item">
                <button type="button" className="p-link">
                  <i className="pi pi-search"></i>
                </button>
              </li>
              <li className="notifications-item active-menuitem">
                <button type="button" className="p-link">
                  <i className="pi pi-bell"></i>
                  <span className="topbar-badge">5</span>
                </button>
                <ul className="notifications-menu fade-in-up">
                  <li role="menuitem">
                    <button type="button" className="p-link" tabIndex="0">
                      <i className="pi pi-shopping-cart"></i>
                      <div className="notification-item">
                        <div className="notification-summary">Новые</div>
                        <div className="notification-detail">
                          Внесено <strong>3</strong> свид.
                        </div>
                      </div>
                    </button>
                  </li>
                  <li role="menuitem">
                    <button type="button" className="p-link">
                      <i className="pi pi-check-square"></i>
                      <div className="notification-item">
                        <div className="notification-summary">
                          Withdrawn Completed
                        </div>
                        <div className="notification-detail">
                          Funds are on their way.
                        </div>
                      </div>
                    </button>
                  </li>
                  <li role="menuitem">
                    <button type="button" className="p-link">
                      <i className="pi pi-chart-line"></i>
                      <div className="notification-item">
                        <div className="notification-summary">
                          Monthly Reports
                        </div>
                        <div className="notification-detail">
                          New reports are ready.
                        </div>
                      </div>
                    </button>
                  </li>
                  <li role="menuitem">
                    <button type="button" className="p-link">
                      <i className="pi pi-comments"></i>
                      <div className="notification-item">
                        <div className="notification-summary">Комменты</div>
                        <div className="notification-detail">
                          <strong>2</strong> новых.
                        </div>
                      </div>
                    </button>
                  </li>
                  <li role="menuitem">
                    <button type="button" className="p-link">
                      <i className="pi pi-exclamation-circle"></i>
                      <div className="notification-item">
                        <div className="notification-summary">
                          Chargeback Request
                        </div>
                        <div className="notification-detail">
                          <strong>1</strong> to review.
                        </div>
                      </div>
                    </button>
                  </li>
                </ul>
              </li>
              <WrappedProfileMenu />
              <li className="right-sidebar-item">
                <button type="button" className="p-link">
                  <i className="pi pi-align-right"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="layout-content">
          <h1>MainPage</h1>
        </div>
        <div className="layout-footer">
          <div className="footer-logo-container">
            <span className="app-name">Медицинское свидетельство о смерти</span>
          </div>
          <span className="copyright">© АМИАЦ - 2020</span>
        </div>
        <div className="layout-sidebar">
          <a className="logo" href="#/">
            <img
              id="app-logo"
              className="logo-image"
              src={avatar}
              alt="diamond layout"
            />
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
                  <div
                    className="layout-menuitem-root-text"
                    style={{ textTransform: "uppercase" }}
                  >
                    Favorites
                  </div>
                </div>
                <ul className="layout-menu" role="menu">
                  <li role="menuitem">
                    <a className="p-ripple" href="#/">
                      <i className="layout-menuitem-icon pi pi-fw pi-home"></i>
                      <span className="layout-menuitem-text">Dashboard</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
}