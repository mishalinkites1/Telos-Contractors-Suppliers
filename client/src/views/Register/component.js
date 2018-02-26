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
import Dropzone from 'react-dropzone'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Translate from '../../components/translate-components';
import {reactTranslateChangeLanguage} from '../../components/translate-components'
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
      show: false,
      value: "en",
    }
     this.handleChangeSelect = this.handleChangeSelect.bind(this)
  }
  componentWillMount(event){   
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
  componentWillUnmount(){
   
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
    console.log("hello", nextProps)
    if(nextProps.registerPhase == "success"){
      this.setState({redirect: true})
      this.render()
    }
    }
  handleAccountChange(e, value){
    this.setState({accountType: value})
    if(value === "contractor"){
      this.setState({show: true})
    }
    else{
      this.setState({show: false})
    }
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
      contactPerson: this.state.contactPerson,
      image: this.state.imagePreviewUrl
    }
    this.setState({error: ''})
    console.log(formdata, "formdata")
    registerUser(formdata)   
  }
  else{
    this.setState({error: "Password Does Not Match"})
  }
  }
   onDrop(files) {
    this.setState({
      files
    });
  }
  _handleImageChange(e) {
     var _URL = window.URL || window.webkitURL;
    e.preventDefault();
    let self=this
    let reader = new FileReader();
    let file = e.target.files[0];
    console.log(file, "file")
    this.setState({fileType: file.type})
    reader.onloadend = () => {
        //if(this.width >= 640 && this.height >= 640){
          self.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        // } else {
        //   self.setState({openSnackbar: true , errMessage: "Please Select a Image Greater than 640 x 640"})
        // }
    }
    var read = reader.readAsDataURL(file) 
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
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
    if(this.state.redirect == true){
      return(
        <Redirect to = "/login" />
        )
    }
    const supplier = <p><Translate>Supplier</Translate></p>
     const contractor = <p><Translate>Contractor</Translate></p>
      return (
         <div className="wrapper-page animated fadeInDown">
        <div className="panel panel-color panel-primary">
          <div className="panel-heading"> 
            <h3 className="text-center m-t-10"><Translate>Create a new Account</Translate></h3>
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
          <span>{this.state.error}</span>
          <div className="form-horizontal m-t-40">
           <div className="form-group ">
              <div className="col-xs-12">
              <span><Translate>Account Type</Translate></span><br/>
                <RadioButtonGroup name="shipSpeed" defaultSelected="not_light" className="radio_btn" valueSelected={ this.state.accountType} onChange={this.handleAccountChange.bind(this)}>
                  <RadioButton
                    value="supplier"
                    label={supplier}
                    style={styles.radioButton}
                  />
                  <RadioButton
                    value="contractor"
                    label={contractor}
                    style={styles.radioButton}
                  />
                  </RadioButtonGroup>
              </div>
            </div>
            {this.state.show == true ?
             <div className="form-group">
              <div className="col-xs-12">
              <span><Translate>Business Registry</Translate></span>
            <Dropzone onDrop={this.onDrop.bind(this)} className="dropzone_reg" onChange={(e)=>this._handleImageChange(e)} >
                {this.state.imagePreviewUrl ?
                <img src={this.state.imagePreviewUrl} className="" />
                :
                <p>Add Your Image</p>
                }
              </Dropzone>
              </div>
              </div>
               : '' }
            <div className="form-group">
              <div className="col-xs-12">
              <span><Translate>Email</Translate></span>
                <input className="form-control" type="email" name="email" value={this.state.email} onChange={this.handleChange.bind(this)}  required />
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-12">
              <span><Translate>Account</Translate></span>
                <input className="form-control" type="text" name="account" value={this.state.account} onChange={this.handleChange.bind(this)} required placeholder="" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-12">
              <span><Translate>Area Code</Translate></span>
                <input className="form-control" type="text" name="areaCode" value={this.state.areaCode} onChange={this.handleChange.bind(this)} required placeholder="" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-12">
              <span><Translate>English Name</Translate></span>
                <input className="form-control" type="text" name="englishName" value={this.state.englishName} onChange={this.handleChange.bind(this)} required placeholder=" " />
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-12">
              <span><Translate>Chinese Name</Translate></span>
                <input className="form-control" type="text" name="chineseName" value={this.state.chineseName} onChange={this.handleChange.bind(this)} required placeholder="" />
              </div>
            </div>
            <div className="form-group ">
              <div className="col-xs-12">
              <span><Translate>Phone</Translate></span>
                <input className="form-control " type="text" name="tel" required value={this.state.tel} onChange={this.handleChange.bind(this)} placeholder="" />
              </div>
            </div>
             <div className="form-group ">
              <div className="col-xs-12">
              <span><Translate>Fax</Translate></span>
                <input className="form-control " type="text" name="fax" required value={this.state.fax} onChange={this.handleChange.bind(this)} placeholder="" />
              </div>
            </div>
            <div className="form-group ">
              <div className="col-xs-12">
              <span><Translate>Website</Translate></span>
                <input className="form-control " type="text" name="website" required value={this.state.website} onChange={this.handleChange.bind(this)} placeholder="" />
              </div>
            </div>
            <div className="form-group ">
              <div className="col-xs-12">
              <span><Translate>Contact Person</Translate></span>
                <input className="form-control " type="text" name="contactPerson" required value={this.state.contactPerson} onChange={this.handleChange.bind(this)} placeholder="" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-12">
              <span><Translate>Address English</Translate></span>
                <input className="form-control " type="text"  name="addEnglish" required value={this.state.addEnglish} onChange={this.handleChange.bind(this)} placeholder=" " />
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-12">
              <span><Translate>Address Chinese</Translate></span>
                <input className="form-control " type="text" name="addChinese" required value={this.state.addChinese} onChange={this.handleChange.bind(this)} placeholder="" />
              </div>
            </div>
            <div className="form-group ">
              <div className="col-xs-12">
              <span><Translate>Founded In</Translate></span>
                <input className="form-control "  type="text" name="foundedIn" value={this.state.foundedIn} onChange={this.handleChange.bind(this)} required placeholder="" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-12">
              <span><Translate>Password</Translate></span>
                <input className="form-control " type="password"  name="password" required value={this.state.password} onChange={this.handleChange.bind(this)}  placeholder="" />
              </div>
            </div>
             <div className="form-group">
              <div className="col-xs-12">
              <span><Translate>Confirm Password</Translate></span>
                <input className="form-control " type="password" required name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange.bind(this)}  placeholder=" " />
              </div>
            </div>
            <div className="form-group ">
              <div className="col-xs-12">
                <label className="cr-styled">
                  <input type="checkbox" defaultChecked />
                  <i className="fa" /> 
                  <Translate>I accept</Translate><strong><a href="#"><Translate>Terms and Conditions</Translate></a></strong>
                </label>
              </div>
            </div>
            <div className="form-group text-right">
              <div className="col-xs-12">
                <button className="btn btn-purple w-md" type="submit" onClick={this.handleSubmit.bind(this)}><Translate>Register</Translate></button>
              </div>
            </div>
            <div className="form-group m-t-30">
              <div className="col-sm-12 text-center">
                <Link to="/login"><Translate>Already have account?</Translate></Link>
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
