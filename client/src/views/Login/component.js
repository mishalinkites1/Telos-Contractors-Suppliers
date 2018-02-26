import 'rxjs'
import React, { Component } from 'react'
import PropTypes from "prop-types"
import { Field, reduxForm } from 'redux-form'
import UserModel from '../../store/user/user-model'
import config from '../../config'
import { Redirect, Link } from 'react-router-dom'
import Snackbar from 'material-ui/Snackbar'
import { RadioButton } from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton';
import './styles.scss'
import {Dots} from 'react-activity';
import {
  Checkbox,
  RadioButtonGroup,
  TextField,
  DatePicker
} from 'redux-form-material-ui'
import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
import MenuItem from 'material-ui/MenuItem';
import logo from '../../../public/logo.png'
import Translate from '../../components/translate-components';
import {reactTranslateChangeLanguage} from '../../components/translate-components'
const required = value => value ? '' : <div><p className="error-text">Required <i className="fa fa-exclamation-triangle pull-right" aria-hidden="true"></i></p></div>

const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? <div><p className="error-text">Invalid email address<i className="fa fa-exclamation-triangle pull-right" aria-hidden="true"></i></p></div>
  : ''

const styles = {
    underlineFocusStyle: {
    borderColor: "#009587"
  }
}
const styless = {
  block: {
    maxWidth: 250,
  },
  toggle: {
    marginBottom: 16,
  },
  thumbOff: {
    backgroundColor: '#ffcccc',
  },
  trackOff: {
    backgroundColor: '#ff9d9d',
  },
  thumbSwitched: {
    backgroundColor: 'red',
  },
  trackSwitched: {
    backgroundColor: '#ff9d9d',
  },
  labelStyle: {
    color: 'red',
  },
};
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
      value: 1,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.handleChangeSelect = this.handleChangeSelect.bind(this)
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
     /**/
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
            <h3 className="text-center m-t-10"><Translate>Sign In to</Translate><strong><Translate>Telos</Translate></strong></h3>
          </div>
          <div className=" pull-right">
          <SelectField
          floatingLabelText="Language"
          value={this.state.value}
          onChange={this.handleChangeSelect}
        >
          <MenuItem value="en" primaryText="English" />
          <MenuItem value="es" primaryText="Chinese" />
        </SelectField>
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
                 <Translate>Remember me</Translate>
                </label>
              </div>
            </div>
            <div className="form-group text-right">
              <div className="col-xs-12">
                <button className="btn btn-purple w-md" type="submit" onClick={this.handleSubmit.bind(this)}><Translate>Log In</Translate></button>
              </div>
            </div>
            <div className="form-group m-t-30">
              <div className="col-sm-7">
                <a href="recoverpw.html"><i className="fa fa-lock m-r-5" /><Translate>Forgot your password?</Translate></a>
              </div>
              <div className="col-sm-5 text-right">
                <Link to="/register"><Translate>Create an account</Translate></Link>
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
