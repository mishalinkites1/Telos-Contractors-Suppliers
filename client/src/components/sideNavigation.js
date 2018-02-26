import React, { PureComponent } from 'react'
import PropTypes from "prop-types"
import { Redirect, Link } from 'react-router-dom'
import { AppBar } from 'material-ui'
import { Container, Row, Col, } from 'react-grid-system'
import { reactTranslateChangeLanguage } from './translate-components'
import Translate from './translate-components'

export default class SideNavigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {open: false}; 
  }
  componentWillMount(){
    let language = window.localStorage.getItem("language");
    console.log(language, "language")
    if (language === "zh-HK") {
      //console.log("helfdfdl")
      reactTranslateChangeLanguage('es');
    }else{
      console.log("hell")
      reactTranslateChangeLanguage('en');
    }
  }
  componentDidMount(){
    let language = window.localStorage.getItem("language");
    console.log(language, "language")
    if (language === "zh-HK") {
      //console.log("helfdfdl")
      reactTranslateChangeLanguage('es');
    }else{
      console.log("hell")
      reactTranslateChangeLanguage('en');
    }
  }
  render() {
    let user = JSON.parse(window.localStorage.getItem("user"))
    let role = user.account
    const currentLocation = location.pathname
    return (
      <div>
      <aside className="left-panel custome-side-nav" id="asideleft">
          {/* brand */}
          <div className="logo">
            <Link to="index.html" className="logo-expanded">
              <img src= "img/favicon.png" alt="" className="fav-icon"/>
              <span className="nav-label"><Translate>TELOS</Translate></span>
            </Link>
          </div>
          {/* / brand */}
          {/* Navbar Start */}
          <nav className="navigation">
          
            <ul className="list-unstyled">
              <li className="has-submenu" data-toggle="collapse" data-target="#menu1"><Link to="#"><i className="ion-flask" /> <span className="nav-label" ><Translate>My Tender</Translate></span></Link>
              </li>
                <ul className="list-unstyled mytender-list collapse" id="menu1" >
                  <li className=""><Link to="/notices" ><Translate>Current Tender</Translate></Link></li>
                  <li><Link to="/notices"><Translate>Past Tender</Translate></Link></li>
                </ul>
              
              <li className="has-submenu" data-toggle="collapse" data-target="#menu2"><Link to="#"><i className="ion-settings" /> <span className="nav-label"><Translate>Contractors</Translate></span></Link>
                </li><ul className="list-unstyled mytender-list collapse" id="menu2">
                  <li><Link to="grid.html"><Translate>Consultants</Translate></Link></li>
                  <li><Link to="portlets.html"><Translate>Construction</Translate></Link></li>
                  <li><Link to="widgets.html"><Translate>Air Conditioning</Translate></Link></li>
                  <li><Link to="nestable-list.html"><Translate>Plumbing and Electrical</Translate></Link></li>
                  <li><Link to="calendar.html"><Translate>Fire Control</Translate></Link></li>
                  <li><Link to="ui-sliders.html"><Translate>Demoliation</Translate></Link></li>
                   <li><Link to="ui-sliders.html"><Translate>Architects</Translate></Link></li>
                    <li><Link to="ui-sliders.html"><Translate>Surveyors</Translate></Link></li>
                     <li><Link to="ui-sliders.html"><Translate>Interior Designers</Translate></Link></li>
                </ul>
              
              <li className="has-submenu" data-toggle="collapse" data-target="#menu3"><Link to="#"><i className="ion-compose" /> <span className="nav-label"><Translate>Suppliers</Translate></span></Link>
                </li>
                <ul className="list-unstyled mytender-list collapse" id="menu3">
                  <li><Link to="form-elements.html"><Translate>Materials</Translate></Link></li>
                  <li><Link to="form-validation.html"><Translate>Furniture</Translate></Link></li>
                </ul>
              
             
            </ul>
          </nav>
        </aside>        
        </div>   
    );
  }
}