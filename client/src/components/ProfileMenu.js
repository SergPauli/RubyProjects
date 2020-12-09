import { bindActionCreators } from "redux";
import ava from "../images/ava.png";
const { Component } = require("react");
const { connect } = require("react-redux");
const { AuthService } = require("../service/authService");
const { actionLogout } = require("../redux/action");

class ProfileMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { fadeInDown: "" };
    this.authService = new AuthService();
    this.logout = this.logout.bind(this);
    this.menuTogle = this.menuTogle.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ fadeInDown: "" })
    }
  }
  logout() {
    const { actionLogout } = this.props;
    this.authService.logout().then((data) => {
      actionLogout()
    })
  }

  menuTogle() {
    this.setState({
      fadeInDown:
        this.state.fadeInDown === "" ? " active-menuitem fadeInDown" : "",
    });
  }

  render() {
    const parentClassList = `profile-item${this.state.fadeInDown}`
    const { username } = this.props
    return (
      <li className={parentClassList}>
        <button type="button" className="p-link" onClick={this.menuTogle}>
          <img
            src={ava}
            alt="diamond-layout"
            className="profile-image"
          />
          <span className="profile-name">{username}</span>
        </button>
        <ul className="profile-menu fade-in-up" ref={this.setWrapperRef}>
          <li>
            <button type="button" className="p-link">
              <i className="pi pi-user"></i>
              <span>Profile</span>
            </button>
          </li>
          <li>
            <button type="button" className="p-link">
              <i className="pi pi-cog"></i>
              <span>Settings</span>
            </button>
          </li>
          <li>
            <button type="button" className="p-link">
              <i className="pi pi-calendar"></i>
              <span>Calendar</span>
            </button>
          </li>
          <li>
            <button type="button" className="p-link">
              <i className="pi pi-inbox"></i>
              <span>Inbox</span>
            </button>
          </li>
          <li>
            <button type="button" className="p-link" onClick={this.logout}>
              <i className="pi pi-power-off"></i>
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </li>
    );
  }
}
const mapActionToProps = (dispatch) => {
  return { actionLogout: bindActionCreators(actionLogout, dispatch) }
}

const mapStateToProps = (state) => {
  return { username: state.auth.name }
}

const WrappedProfileMenu = connect(
  mapStateToProps,
  mapActionToProps
)(ProfileMenu);
export default WrappedProfileMenu