import React, { PureComponent } from 'react'
import PropTypes from "prop-types"
import { Redirect, Link } from 'react-router-dom'
import { AppBar } from 'material-ui'
import { Container, Row, Col, } from 'react-grid-system'

export default class SideNavigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {open: false}; 
  }

  render() {
    let user = JSON.parse(window.localStorage.getItem("user"))
    let role = user.account
    const currentLocation = location.pathname
    return (
      <div>
      <aside className="left-panel">
          {/* brand */}
          <div className="logo">
            <a href="index.html" className="logo-expanded">
              <i className="ion-social-buffer" />
              <span className="nav-label">TELOS</span>
            </a>
          </div>
          {/* / brand */}
          {/* Navbar Start */}
          <nav className="navigation">
          
            <ul className="list-unstyled">
              <li className="active" data-toggle="collapse" data-target="#demo"><a href=""><i className="ion-home" /> <span className="nav-label">Dashboard</span></a></li>
              <li className="has-submenu" data-toggle="collapse" data-target="#menu1"><a href="#"><i className="ion-flask" /> <span className="nav-label">My Tender</span></a>
                <ul className="list-unstyled collapse" id="menu1" >
                  <li><a href="/notices">Current Tender</a></li>
                  <li><a href="buttons.html">Past Tender</a></li>
                </ul>
              </li>
              <li className="has-submenu" data-toggle="collapse" data-target="#menu2"><a href="#"><i className="ion-settings" /> <span className="nav-label">Contractors</span><span className="badge bg-success">New</span></a>
                <ul className="list-unstyled collapse" id="menu2">
                  <li><a href="grid.html">Consultants</a></li>
                  <li><a href="portlets.html">Construction</a></li>
                  <li><a href="widgets.html">Air Conditioning</a></li>
                  <li><a href="nestable-list.html">Plumbing and Electrical</a></li>
                  <li><a href="calendar.html">Fire Control</a></li>
                  <li><a href="ui-sliders.html">Demoliation</a></li>
                   <li><a href="ui-sliders.html">Architects</a></li>
                    <li><a href="ui-sliders.html">Surveyors</a></li>
                     <li><a href="ui-sliders.html">Interior Designers</a></li>
                </ul>
              </li>
              <li className="has-submenu" data-toggle="collapse" data-target="#menu3"><a href="#"><i className="ion-compose" /> <span className="nav-label">Suppliers</span></a>
                <ul className="list-unstyled collapse" id="menu3">
                  <li><a href="form-elements.html">Materials</a></li>
                  <li><a href="form-validation.html">Furniture</a></li>
                </ul>
              </li>
             
            </ul>
          </nav>
        </aside>        
        </div>   
    );
  }
}