import React, { PureComponent } from 'react'
import PropTypes from "prop-types"
import { Redirect, Link } from 'react-router-dom'
import { AppBar } from 'material-ui'
import { Container, Row, Col, } from 'react-grid-system'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import RaisedButton from 'material-ui/RaisedButton';
import SideNavigation from '../../components/sideNavigation'
import TopNavigation from '../../components/topNavigation'
import TextField from 'material-ui/TextField'
import ActionHome from 'material-ui/svg-icons/action/home'
import './styles.scss'
import Paper from 'material-ui/Paper'
import ListNotices from './partials/ListNotices/component'

export default class universityForm extends React.Component { 
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      err: '',
      pageTitle : 'Application Analytics' 
    };
  }

  handleSignouts(event) {
    const { handleSignOut } = this.props
    handleSignOut()
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const err = {};
    if(this.state.name === ''){
      err.name = 'Plsease enter name of university.'
    }
    this.setState({ err })
    if (!Object.keys(err).length) {
      const { saveUniversity } = this.props
      const data = {
        name: this.state.name
      }
      saveUniversity(data)
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
      <div>
      
         <div id="wrapper">
          <div>
          {this.props.location.pathname === '/notices' && <ListNotices {...this.props}/>}
           </div>
        </div>
      </div>

    );
  }
}