import React, { PureComponent } from 'react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from "prop-types"
import { Redirect, Link } from 'react-router-dom'
import { Container, Row, Col, } from 'react-grid-system'
import SideNavigation from '../../../../components/sideNavigation'
import TopNavigation from '../../../../components/topNavigation'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Paper from 'material-ui/Paper'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import ActionDown from 'material-ui/svg-icons/navigation/arrow-downward';
import ActionUp from 'material-ui/svg-icons/navigation/arrow-upward';
import {Tabs, Tab} from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton'
import '../../styles.scss'
import Dialog from 'material-ui/Dialog';
import ReactDOM from 'react-dom'
import Dropzone from 'react-dropzone'
import ReactLoading from 'react-loading';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment'
const listStyles = { paddingTop: 0, paddingBottom: 0 }
const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};
const customContentStyle = {
  
  height: '100px'
};
class actionPlansForm extends React.Component { 
  constructor(props) {
    super(props)
    this.state = {
      notices: [],
      open: false,
      files: [],
      noticeTitle: '',
      description: '',
      projectCategory: ''
    };
  }

  componentWillMount(event){   
    const {fetchNotices} = this.props
    fetchNotices()
  }
  componentWillUnmount(){
    const position = {}
    position.x = window.pageXOffset
    position.y = window.pageYOffset
    localStorage.setItem('scrollTo', JSON.stringify(position))
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps, "ffffffffffff")
    if(nextProps.submitPhase === 'success'){
      console.log("yessss done")
      this.setState({open: false, loading: false});
      this.componentWillMount()
    }
    if(nextProps.submitPhase === 'loading'){
      this.setState({loading: true})
    }
    if(nextProps.fetchPhase === 'loading'){
      this.setState({isloading : true})
    }
    if(nextProps.fetchPhase === 'success'){
      this.setState({isloading : false})
    }
    this.setState({notices: nextProps.Notices})
  }
    handleOpen = () => {
        this.setState({open: true});
      };

      handleClose = () => {
        this.setState({open: false});
      };
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  onDrop(files) {
    this.setState({
      files
    });
  }
  handleDateChange(e, date){
    console.log(date, "date")
    this.setState({effectiveUntil: date})
  }
  handleSubmit(){
    const {submitNotice} = this.props
    console.log(this.state.imagePreviewUrl, "hello")
    let formdata = {}
    formdata.noticeTitle = this.state.noticeTitle
    formdata.projectCategory = this.state.projectCategory
    formdata.description = this.state.description
    formdata.effectiveUntil = this.state.effectiveUntil
    formdata.file = this.state.imagePreviewUrl
    formdata.fileType = this.state.fileType
    formdata.name = "jheee"
    console.log("hello")
    submitNotice(formdata)
    this.setState({loading: true})
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
   
  render() {  
    let self = this
    let user = JSON.parse(window.localStorage.getItem("user"))
    let role = user.account
    const currentLocation = location.pathname
    const style = {
      margin: 12,
    };
    var date = ''
    if(this.state.notices.length !=0){
    var notices = this.state.notices.map(function(data, key) {
    return(
      <tr>
         <Link to={data.image}><td>{data.noticeTitle}</td></Link>
          <td>{data.projectCategory}</td>
          <td>{data.description}</td>
          <td>{moment(new Date(data.effectiveUntil)).format('dddd MMMM DD YYYY ')}</td>
           <td>{moment(new Date(data.postedOn)).format('dddd MMMM DD YYYY ')}</td>
      </tr>
    )
    })
    }
    return (
      <div>

      <SideNavigation/>

     <section className="content notice-page">
        {/* Header */}
       <TopNavigation/>
        {/* Header Ends */}
        {/* Page Content Start */}
        {/* ================== */}
        <div className="wraper container-fluid">

          <div className="page-title"> 

            <h3 className="title">Tender Notices</h3> 
            
           
            <div>
            { user.nature =="supplier" || user.nature == "contractor" ?
                        <span></span> 
                        : <div><button name="openPopup" className="pull-right btn-primary btn-block btn_notice"  onClick={this.handleOpen}> Add a Tender Notice </button> <br/> </div>}
          
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Current Notices</h3>
                </div>
                <div className="panel-body notices-table">
                  <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                      <table id="datatable" className="table table-striped table-bordered text_table">
                        <thead>
                          <tr>
                            <th>Notice Title</th>
                            <th>Project Category</th>
                            <th>Description</th>
                            <th>Effective Until</th>
                            <th>Posted On</th>
                          </tr>
                        </thead>
                        <tbody>
                         {notices}
                          
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> {/* End Row */}
        </div>
        {/* Page Content Ends */}
        {/* ================== */}
        {/* Footer Start */}
        {/* Footer Ends */}
      </section>    
        {this.state.loading == true ? 
                
          <div className="loader-section">
             <div id="loader"></div>
          </div>
                      
      : ''}
      <Dialog
          title="Add a Notice"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
      
          <div className="form-group">
              <div className="col-xs-12 form_dialog">
              <span>Notice Title</span>
                <input className="form-control" type="email" name="noticeTitle" value={this.state.noticeTitle} onChange={this.handleChange.bind(this)}  required />
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-12 form_dialog">
              <span>Project Category</span>
                <input className="form-control" type="email" name="projectCategory" value={this.state.projectCategory} onChange={this.handleChange.bind(this)}  required />
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-12 form_dialog">
              <span>Description</span>
                <input className="form-control" type="email" name="description" value={this.state.description} onChange={this.handleChange.bind(this)}  required />
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-12 form_dialog">
              <span>Effective Until</span>
                <DatePicker hintText="Date" name="effectiveUntil" onChange={this.handleDateChange.bind(this)} />
              </div>
            </div>
            <div className="">
              <div className="col-xs-12 form_dialog">
              <span>Image</span>
                <Dropzone onDrop={this.onDrop.bind(this)} className="dropzone" onChange={(e)=>this._handleImageChange(e)} >
                 <div className="attached_files">     
                <h2>Dropped files</h2>
                <ul>
                  {
                    this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                  }
                </ul>
              </div>
              </Dropzone>
              </div><br/>
            </div><br/>
             <div className="col-xs-4 pull-right">
            <button name="Cancel" onClick={this.handleClose} style={{    height: '38px'}} className="btn-primary btn-block">Close</button>
            </div>
            <div className="col-xs-4 pull-right">
            <button name="Submit" onClick={this.handleSubmit.bind(this)} style={{    height: '38px'}} className="btn-primary btn-block">Submit</button>
            </div>
            
          </Dialog>       
      </div>    
    );
  }
}export default reduxForm({
  form: 'actionPlans',  // a unique identifier for this form
  destroyOnUnmount: true,
})(actionPlansForm)