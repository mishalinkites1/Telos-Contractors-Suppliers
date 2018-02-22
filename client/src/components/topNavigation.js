import React, { PureComponent } from 'react'
import PropTypes from "prop-types"
import { Redirect, Link } from 'react-router-dom'
import { AppBar } from 'material-ui'
import { Container, Row, Col, } from 'react-grid-system'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
export default class SideNavigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {open: false}; 
  }

   handleSignouts(event) {
    const { handleSignOut } = this.props
    handleSignOut()
  }


  render() {
    let user = JSON.parse(window.localStorage.getItem("user"))
    let role = user.account
    const currentLocation = location.pathname
    const style = {
      margin: 12,
    };
    return (
       <header className="app-header navbar">
    <button className="navbar-toggler mobile-sidebar-toggler d-lg-none mr-auto" type="button">
      <span className="navbar-toggler-icon"></span>
    </button>
    <a className="navbar-brand" href="#"></a>
    <button className="navbar-toggler sidebar-toggler d-md-down-none" type="button" onClick={this.handleToggle}>
      <span className="navbar-toggler-icon"></span>
    </button>
    {/*<Drawer
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
          containerClassName="sideBar"
        >
          <a className="nav-link" href="#"><MenuItem containerClassName ="menuSideBar" onClick={this.handleClose}>Notices </MenuItem></a>
          <MenuItem containerClassName ="menuSideBar" onClick={this.handleClose}>Meetings</MenuItem>
          <MenuItem containerClassName ="menuSideBar" onClick={this.handleClose}>Surveys</MenuItem>
          <MenuItem containerClassName ="menuSideBar" onClick={this.handleClose}>Forum</MenuItem>
        </Drawer>*/}
    <ul className="nav navbar-nav d-md-down-none">
      <li className="nav-item px-3">
        <a className="nav-link" href="#">Dashboard</a>
      </li>
      <li className="nav-item px-3">
        <a className="nav-link" href="#">Users</a>
      </li>
      <li className="nav-item px-3">
        <a className="nav-link" href="#">Settings</a>
      </li>
    </ul>
    <ul className="nav navbar-nav ml-auto">
      <li className="nav-item d-md-down-none">
        <a className="nav-link" href="#"><i className="icon-bell"></i><span className="badge badge-pill badge-danger">5</span></a>
      </li>
      <li className="nav-item d-md-down-none">
        <a className="nav-link" href="#"><i className="icon-list"></i></a>
      </li>
      <li className="nav-item d-md-down-none">
        <a className="nav-link" href="#"><i className="icon-location-pin"></i></a>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
          <img src="img/avatars/6.jpg" className="img-avatar" alt="admin@bootstrapmaster.com"/>
        </a>
        <div className="dropdown-menu dropdown-menu-right">
          <div className="dropdown-header text-center">
            <strong>Account</strong>
          </div>
          <a className="dropdown-item" href="#"><i className="fa fa-bell-o"></i> Updates<span className="badge badge-info">42</span></a>
          <a className="dropdown-item" href="#"><i className="fa fa-envelope-o"></i> Messages<span className="badge badge-success">42</span></a>
          <a className="dropdown-item" href="#"><i className="fa fa-tasks"></i> Tasks<span className="badge badge-danger">42</span></a>
          <a className="dropdown-item" href="#"><i className="fa fa-comments"></i> Comments<span className="badge badge-warning">42</span></a>
          <div className="dropdown-header text-center">
            <strong>Settings</strong>
          </div>
          <a className="dropdown-item" href="#"><i className="fa fa-user"></i> Profile</a>
          <a className="dropdown-item" href="#"><i className="fa fa-wrench"></i> Settings</a>
          <a className="dropdown-item" href="#"><i className="fa fa-usd"></i> Payments<span className="badge badge-secondary">42</span></a>
          <a className="dropdown-item" href="#"><i className="fa fa-file"></i> Projects<span className="badge badge-primary">42</span></a>
          <div className="divider"></div>
          <a className="dropdown-item" href="#"><i className="fa fa-shield"></i> Lock Account</a>
          <a className="dropdown-item" href="#"><i className="fa fa-lock"></i> Logout</a>
        </div>
      </li>
    </ul>
    <button className="navbar-toggler aside-menu-toggler" type="button">
      <span className="navbar-toggler-icon"></span>
    </button>

  </header>            
    );
  }
}