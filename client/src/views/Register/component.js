import 'rxjs'
import React, { Component } from 'react'
import PropTypes from "prop-types"
import { Field, reduxForm } from 'redux-form'
import UserModel from '../../store/user/user-model'
import config from '../../config'
import { Redirect, Link } from 'react-router-dom'
import SideNavigation from '../../components/sideNavigation'
import TopNavigation from '../../components/topNavigation'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const required = value => value ? '' : 'Required'
const PUBLIC_URL = process.env.PUBLIC_URL
const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
    width: '50%',
  },
};
class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      err: {},
      openSnackbar: false,
      errMessage:'',
      error: '',
      redirect: false,
    }
     
  }
  componentWillMount(event){   
   console.log("hello")
  }
  componentWillUnmount(){
   
  }
  componentWillReceiveProps(nextProps) {
    console.log("hello", nextProps)
    if(nextProps.registerPhase == "success"){
      this.setState({redirect: true})
      this.render()
    }
    }
  handleAccountChange(e, value){
    this.setState({accountType: value})
  }
  handleSubmit(data) {   
    const { registerUser } = this.props
    if(this.state.confirmPassword == this.state.password){
    const formdata = {
      nature: this.state.accountType,
      account: this.state.account,
      password: this.state.password,
      areaCode: this.state.areaCode,
      chineseName: this.state.chineseName,
      englishName: this.state.englishName,
      foundedIn: this.state.foundedIn,
      address: {
        eng: this.state.addEnglish,
        chn: this.state.addChinese
      },
      tel: this.state.tel,
      fax: this.state.fax,
      email: this.state.email,
      website: this.state.website,
      contactPerson: this.state.contactPerson
    }
    this.setState({error: ''})
    console.log(formdata, "formdata")
    registerUser(formdata)   
  }
  else{
    this.setState({error: "Password Does Not Match"})
  }
  }
   
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    if(this.state.redirect == true){
      return(
        <Redirect to = "/login" />
        )
    }
      return (
         <div className="wrapper-page animated fadeInDown">
        <div className="panel panel-color panel-primary">
          <div className="panel-heading"> 
            <h3 className="text-center m-t-10"> Create a new Account </h3>
          </div> 
          <span>{this.state.error}</span>
          <div className="form-horizontal m-t-40">

           <div className="form-group ">
              <div className="col-xs-12">
              <span>Account Type</span><br/>
                <RadioButtonGroup name="shipSpeed" defaultSelected="not_light" className="radio_btn" valueSelected={ this.state.accountType} onChange={this.handleAccountChange.bind(this)}>
                  <RadioButton
                    value="supplier"
                    label="Supplier"
                    style={styles.radioButton}
                  />
                  <RadioButton
                    value="contractor"
                    label="Contractor"
                    style={styles.radioButton}
                  />
                  </RadioButtonGroup>
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-12">
              <span>Email</span>
                <input className="form-control" type="email" name="email" value={this.state.email} onChange={this.handleChange.bind(this)}  required />
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-12">
              <span>Account</span>
                <input className="form-control" type="text" name="account" value={this.state.account} onChange={this.handleChange.bind(this)} required placeholder="" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-12">
              <span>Area Code</span>
                <input className="form-control" type="text" name="areaCode" value={this.state.areaCode} onChange={this.handleChange.bind(this)} required placeholder="" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-12">
              <span>English Name</span>
                <input className="form-control" type="text" name="englishName" value={this.state.englishName} onChange={this.handleChange.bind(this)} required placeholder=" " />
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-12">
              <span>Chinese Name</span>
                <input className="form-control" type="text" name="chineseName" value={this.state.chineseName} onChange={this.handleChange.bind(this)} required placeholder="" />
              </div>
            </div>
            <div className="form-group ">
              <div className="col-xs-12">
              <span>Phone</span>
                <input className="form-control " type="text" name="tel" required value={this.state.tel} onChange={this.handleChange.bind(this)} placeholder="" />
              </div>
            </div>
             <div className="form-group ">
              <div className="col-xs-12">
              <span>Fax</span>
                <input className="form-control " type="text" name="fax" required value={this.state.fax} onChange={this.handleChange.bind(this)} placeholder="" />
              </div>
            </div>
            <div className="form-group ">
              <div className="col-xs-12">
              <span>Website</span>
                <input className="form-control " type="text" name="website" required value={this.state.website} onChange={this.handleChange.bind(this)} placeholder="" />
              </div>
            </div>
            <div className="form-group ">
              <div className="col-xs-12">
              <span>Contact Person</span>
                <input className="form-control " type="text" name="contactPerson" required value={this.state.contactPerson} onChange={this.handleChange.bind(this)} placeholder="" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-12">
              <span>Address English</span>
                <input className="form-control " type="text"  name="addEnglish" required value={this.state.addEnglish} onChange={this.handleChange.bind(this)} placeholder=" " />
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-12">
              <span>Address Chinese</span>
                <input className="form-control " type="text" name="addChinese" required value={this.state.addChinese} onChange={this.handleChange.bind(this)} placeholder="" />
              </div>
            </div>
            <div className="form-group ">
              <div className="col-xs-12">
              <span>Founded In</span>
                <input className="form-control "  type="text" name="foundedIn" value={this.state.foundedIn} onChange={this.handleChange.bind(this)} required placeholder="" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-12">
              <span>Password</span>
                <input className="form-control " type="password"  name="password" required value={this.state.password} onChange={this.handleChange.bind(this)}  placeholder="" />
              </div>
            </div>
             <div className="form-group">
              <div className="col-xs-12">
              <span>Confirm Password</span>
                <input className="form-control " type="password" required name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange.bind(this)}  placeholder=" " />
              </div>
            </div>
            <div className="form-group ">
              <div className="col-xs-12">
                <label className="cr-styled">
                  <input type="checkbox" defaultChecked />
                  <i className="fa" /> 
                  I accept <strong><a href="#">Terms and Conditions</a></strong>
                </label>
              </div>
            </div>
            <div className="form-group text-right">
              <div className="col-xs-12">
                <button className="btn btn-purple w-md" type="submit" onClick={this.handleSubmit.bind(this)}>Register</button>
              </div>
            </div>
            <div className="form-group m-t-30">
              <div className="col-sm-12 text-center">
                <Link to="/login">Already have account?</Link>
              </div>
            </div>
          </div>                                  
        </div>
      </div>      
      )
  }
}

export default reduxForm({
  form: 'login',  // a unique identifier for this form
  destroyOnUnmount: true,
})(Register)
