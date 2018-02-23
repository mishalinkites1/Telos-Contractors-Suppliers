import 'rxjs'
import React, { Component } from 'react'
import PropTypes from "prop-types"
import { Field, reduxForm } from 'redux-form'
import UserModel from '../../store/user/user-model'
import config from '../../config'
import { Redirect, Link } from 'react-router-dom'
import Snackbar from 'material-ui/Snackbar'
import MenuItem from 'material-ui/MenuItem'
import { RadioButton } from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton';
import './styles.scss'
import {Dots} from 'react-activity';
import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  TextField,
  Toggle,
  DatePicker
} from 'redux-form-material-ui'
import logo from '../../../public/logo.png'
const required = value => value ? '' : <div><p className="error-text">Required <i className="fa fa-exclamation-triangle pull-right" aria-hidden="true"></i></p></div>

const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? <div><p className="error-text">Invalid email address<i className="fa fa-exclamation-triangle pull-right" aria-hidden="true"></i></p></div>
  : ''

const styles = {
    underlineFocusStyle: {
    borderColor: "#009587"
  }
}
const raisedStyle = {
    height: 51,
    backgroundColor:'#009587',
}

class LoginForm extends Component {   
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      err: {},
      openSnackbar: false,
      errMessage:'',
      loading: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
  }
  static contextTypes = {
   router: PropTypes.object
 }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  componentWillMount() {
   let user = window.localStorage.getItem("user")
   const isAuthed = (user ? true : false)
   if(isAuthed){
     this.context.router.history.push('/dashboard')
   }
 }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps, "nextProps")
    let user = window.localStorage.getItem("user")
    if (nextProps.phase === "error") {
      this.setState({ errMessage: nextProps.rxError.message, openSnackbar: true})
    }
    if(user){
      this.setState({loading: false})
    }
    if(!user && nextProps.phase === "error"){
      this.setState({loading: false, message: "No user Found"})
    }
  }

  handleSubmit(data) {   
    const { loginUser } = this.props
    const formdata = {
      account: this.state.account,
      password: this.state.password
    }
    loginUser(formdata)
    this.setState({loading: true})   
  }

  handleRequestClose() {
    this.setState({
      openSnackbar: false,
      errMessage: ''
    })
  }

  render() {
    const {
      handleSubmit,
      pristine,
      isSubmitting,
      rxError,
      user,
      token,
      phase
    } = this.props    
    if(user){
      return(
        <Redirect to = "/notices" />
        )
    }
    return (
      <div>
       <div className="wrapper-page animated fadeInDown">
        <div className="panel panel-color panel-primary">
          <div className="panel-heading"> 
            <h3 className="text-center m-t-10"> Sign In to <strong>Telos</strong> </h3>
          </div> 
          <div className="form-horizontal m-t-40" >
          <span>{this.state.message}</span>
            <div className="form-group ">
              <div className="col-xs-12">
                <input className="form-control" type="text" placeholder="Username" name="account" value={this.state.account} onChange={this.handleChange.bind(this)}/>
              </div>
            </div>
            <div className="form-group ">
              <div className="col-xs-12">
                <input className="form-control" type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange.bind(this)} />
              </div>
            </div>
            <div className="form-group ">
              <div className="col-xs-12">
                <label className="cr-styled">
                  <input type="checkbox" defaultChecked />
                  <i className="fa" /> 
                  Remember me
                </label>
              </div>
            </div>
            <div className="form-group text-right">
              <div className="col-xs-12">
                <button className="btn btn-purple w-md" type="submit" onClick={this.handleSubmit.bind(this)}>Log In</button>
              </div>
            </div>
            <div className="form-group m-t-30">
              <div className="col-sm-7">
                <a href="recoverpw.html"><i className="fa fa-lock m-r-5" /> Forgot your password?</a>
              </div>
              <div className="col-sm-5 text-right">
                <Link to="/register">Create an account</Link>
              </div>
            </div>
          </div>
        </div>
        {this.state.loading == true ? 
                
          <div className="loader-section">
             <div id="loader"></div>
          </div>
                      
      : ''}
      </div>
  </div>
    )
  }
}

export default reduxForm({
  form: 'login',  // a unique identifier for this form
  destroyOnUnmount: true,
})(LoginForm)
