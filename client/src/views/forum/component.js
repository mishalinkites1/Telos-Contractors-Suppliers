import 'rxjs'
import React, { Component } from 'react'
import PropTypes from "prop-types"
import { Field, reduxForm } from 'redux-form'
import UserModel from '../../store/user/user-model'
import config from '../../config'
import { Redirect, Link } from 'react-router-dom'
import SideNavigation from '../../components/sideNavigation'
import TopNavigation from '../../components/topNavigation'
import ListForum from './partials/ListForum/component'

const required = value => value ? '' : 'Required'
const PUBLIC_URL = process.env.PUBLIC_URL

class BlankForm extends Component {
 
  
  

  constructor(props) {
    super(props)

     
  }

  

  render() {
      return (
              <div>
      
         <div id="wrapper">
          <div>
          {this.props.location.pathname === '/forum' && <ListForum {...this.props}/>}
           </div>
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'login',  // a unique identifier for this form
  destroyOnUnmount: true,
})(BlankForm)
