import React, { PureComponent } from 'react'
import PropTypes from "prop-types"
import { Redirect, Link } from 'react-router-dom'
import { AppBar } from 'material-ui'
import { Container, Row, Col, } from 'react-grid-system'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Translate from './translate-components'
import { reactTranslateChangeLanguage } from './translate-components'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
export default class SideNavigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {open: false}; 
     this.handleChangeSelect = this.handleChangeSelect.bind(this)
  }

   handleSignouts(event) {
    const { handleSignOut } = this.props
    handleSignOut()
  }
  handleLogout(){
    localStorage.removeItem("user")
    //localStorage.removeItem("Authorization")
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
  handleCss(){
   const hasclass = $(".left-panel").hasClass("custome-side-nav");
   console.log(hasclass)
   if(hasclass == true){
    $(".left-panel").removeClass("custome-side-nav")
    $(".left-panel").addClass("custome-side-nav-0")
   }
   else{
    $(".left-panel").addClass("custome-side-nav")
    $(".left-panel").removeClass("custome-side-nav-0")
   }
  }
   handleChangeSelect(event, index, value) {
    this.setState({value})
    if (value === "es") {
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
    const style = {
      margin: 12,
    };
    return (
        <header className="top-head container-fluid">
        <div></div>
       <button type="button" className="navbar-toggle pull-left" onClick={this.handleCss.bind(this)}>
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
               {/* <div className="">
          <SelectField
          floatingLabelText="Language"
          value={this.state.value}
          onChange={this.handleChangeSelect}
        >
          <MenuItem value="en" primaryText="English" />
          <MenuItem value="es" primaryText="Chinese" />
        </SelectField>
        </div> */}
          <a href="/login"><button type="button" className="navbar-toggle pull-right" style={{color: '#5e35b1'}} onClick={this.handleLogout.bind(this)}>
            <Translate>Logout</Translate>
          </button></a>
          {/* Search */}
         
          {/* Left navbar */}
          
        </header>  
    );
  }
}