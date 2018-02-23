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
            <Link to="index.html" className="logo-expanded">
              <img src= "img/favicon.png" alt="" className="fav-icon"/>
              <span className="nav-label">TELOS</span>
            </Link>
          </div>
          {/* / brand */}
          {/* Navbar Start */}
          <nav className="navigation">
          
            <ul className="list-unstyled">
              <li className="has-submenu" data-toggle="collapse" data-target="#menu1"><Link to="#"><i className="ion-flask" /> <span className="nav-label" >My Tender</span></Link>
              </li>
                <ul className="list-unstyled mytender-list collapse" id="menu1" >
                  <li className=""><Link to="/notices" >Current Tender</Link></li>
                  <li><Link to="/notices">Past Tender</Link></li>
                </ul>
              
              <li className="has-submenu" data-toggle="collapse" data-target="#menu2"><Link to="#"><i className="ion-settings" /> <span className="nav-label">Contractors</span><span className="badge bg-success">New</span></Link>
                </li><ul className="list-unstyled mytender-list collapse" id="menu2">
                  <li><Link to="grid.html">Consultants</Link></li>
                  <li><Link to="portlets.html">Construction</Link></li>
                  <li><Link to="widgets.html">Air Conditioning</Link></li>
                  <li><Link to="nestable-list.html">Plumbing and Electrical</Link></li>
                  <li><Link to="calendar.html">Fire Control</Link></li>
                  <li><Link to="ui-sliders.html">Demoliation</Link></li>
                   <li><Link to="ui-sliders.html">Architects</Link></li>
                    <li><Link to="ui-sliders.html">Surveyors</Link></li>
                     <li><Link to="ui-sliders.html">Interior Designers</Link></li>
                </ul>
              
              <li className="has-submenu" data-toggle="collapse" data-target="#menu3"><Link to="#"><i className="ion-compose" /> <span className="nav-label">Suppliers</span></Link>
                </li>
                <ul className="list-unstyled mytender-list collapse" id="menu3">
                  <li><Link to="form-elements.html">Materials</Link></li>
                  <li><Link to="form-validation.html">Furniture</Link></li>
                </ul>
              
             
            </ul>
          </nav>
        </aside>        
        </div>   
    );
  }
}