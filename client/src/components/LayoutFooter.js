import { Component } from "react"

export class LayoutFooter extends Component {
    render(){
        return (
          <div className="layout-footer">
            <div className="footer-logo-container">
              <span className="app-name">Медицинское свидетельство о смерти</span>
            </div>
            <span className="copyright">© АМИАЦ  2020-2021</span>
          </div>
        )
    }
}