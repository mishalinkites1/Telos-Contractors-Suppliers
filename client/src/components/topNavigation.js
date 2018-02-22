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
  handleLogout(){
    localStorage.removeItem("user")
    this.setState({logout: "true"})
    this.context.router.history.push('/login')
  }

  render() {
    let user = JSON.parse(window.localStorage.getItem("user"))
    let role = user.account
    const currentLocation = location.pathname
    const style = {
      margin: 12,
    };
    if(this.state.logout == "true"){
      return(
        <Redirect to={`/login`}/>   
      )
    } 
    return (
        <header className="top-head container-fluid">
          <button type="button" className="navbar-toggle pull-left" >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <button type="button" className="navbar-toggle pull-right" onClick={this.handleLogout.bind(this)}>
            Logout
          </button>
          {/* Search */}
         
          {/* Left navbar */}
          
        </header>  
    );
  }
}