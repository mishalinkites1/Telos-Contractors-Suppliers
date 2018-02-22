import 'rxjs'
import React, { Component } from 'react'
import PropTypes from "prop-types"
import { Field, reduxForm } from 'redux-form'
import { Redirect, Link } from 'react-router-dom'
import '../../styles.scss'
import moment from "moment"
const required = value => value ? '' : 'Required'
const PUBLIC_URL = process.env.PUBLIC_URL
const user = JSON.parse(localStorage.getItem('user'))
class ForumForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      forum: [],
      err: {},
      openSnackbar: false,
      errMessage:'',
    }
    this.handleChange = this.handleChange.bind(this)
    
  }
  static contextTypes = {
   router: PropTypes.object
 }

   componentWillMount(event){   
    const {fetchForum} = this.props
    fetchForum()
  }
  componentWillReceiveProps(nextProps){
    this.setState({forum: nextProps.forum})
    if(nextProps.createPhase === 'success'){
      this.componentWillMount();
    }
    if(nextProps.likePostPhase === 'success'){
      this.componentWillMount();
    }
  }
  handleChange(event){
    this.setState({[event.target.name]: event.target.value})
  }
  handlePostLike(id,){
    const obj = {}
    obj.postId = id
    obj.userId = user._id
    const {likePost} = this.props
    likePost(obj)
  }
  handlePostComment(id,data){
    console.log(this.state.comment, id, this.props)
    const obj = {}
    obj.postId = id
    obj.estateName = user.estateName
    obj.account = user.account
    obj.comment = this.state.comment
    const {saveComment} = this.props
    saveComment(obj)
  }
  render() {
    let self = this
    if(this.state.forum.length !=0){
      var forums = this.state.forum.map(function(data, key) {
      var postTime = moment.utc(new Date(data.postTime));
      postTime =  postTime.format("MM-DD-YYYY hh:mm a");
        console.log(data, "data")
      var hrefs = '#'+ key
      return(
      <div className="panel-group" key={key}>
          <div className="panel panel-default">
            <div data-toggle="collapse"  href={hrefs} className="panel-heading collapse-link">
              <h4 className="panel-title">
                <a >{data.content}</a>
              </h4>
            </div>
            <div id={key} className="panel-collapse collapse">
              <div className="panel-body">
                 <section className="">
                  <div className="">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="post post-single"><br/>
                          <h2 className="post-title">{data.content}</h2>
                          <div className="post-meta">
                            <ul>
                              <li>
                                <i className="tf-ion-ios-calendar" />{postTime}
                              </li>
                              <li>
                                <i className="tf-ion-android-person" /> {data.postedBy.account}
                              </li>
                              <li>
                                <a href><i className="tf-ion-chatbubbles" /> {data.comments.length} COMMENTS</a>
                              </li>
                              <li>
                                <a className="comment-button" onClick={self.handlePostLike.bind(self, data._id)}><i className="fa fa-thumbs-up"></i>Like</a>
                              </li>
                            </ul>
                          </div>
                          <div className="post-content post-excerpt">
                            <p>{data.content}</p>
                          </div>
                          <div className="post-comments">
                            <h3 className="post-sub-heading">{data.comments.length} Comments</h3>
                            <ul className="media-list comments-list m-bot-50 clearlist">
                             {data.comments.map(function(comment, key) {
                              var commentedTime = moment.utc(new Date(comment.commentedTime));
                              commentedTime =  commentedTime.format("MM-DD-YYYY hh:mm a");
                              return (
                              <li className="media">
                                <a className="pull-left" href="#">
                                  <span className="glyphicon glyphicon-user"></span>
                                </a>
                                <div className="media-body">
                                  <div className="comment-info">
                                    <h4 className="comment-author">
                                      <a href="#">{comment.account}</a>
                                    </h4>
                                    <time className="time-space">{commentedTime}</time>
                                    <a className="comment-button" href="#"><i className="fa fa-thumbs-up"></i>Like</a>
                                  </div> 
                                  <p>
                                    {comment.content}
                                  </p>
                                </div>
                              </li>
                              )
                            })
                          }
                            </ul>
                          </div>
                          <div className="post-comments-form">
                            <h3 className="post-sub-heading">Leave You Comments</h3>
                              <div className="row">
                                <div className="form-group col-md-12">
                                  <textarea name="comment" onChange={self.handleChange} className=" form-control" rows={6} placeholder="Comment" maxLength={400}   />
                                </div>
                                <div className="form-group col-md-12">
                                  <button type="submit" className="btn btn-small btn-main " onClick={self.handlePostComment.bind(self, data._id )}>
                                    Send comment
                                  </button>
                                </div>
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      )
      })
    }
    return (
      <div className="app header-fixed sidebar-fixed aside-menu-fixed aside-menu-hidden">
        <header className="app-header navbar">
          <button className="navbar-toggler mobile-sidebar-toggler d-lg-none mr-auto" type="button">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="#"></a>
          <button className="navbar-toggler sidebar-toggler d-md-down-none" type="button" onClick={this.handleToggle}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <ul className="nav navbar-nav d-md-down-none">
            <li className="nav-item px-3">
              <a className="nav-link" href="#">Dashboard</a>
            </li>
            <li className="nav-item px-3">
              <a className="nav-link" href="#">Users</a>
            </li>
            <li className="nav-item px-3">
              <a className="nav-link" href="#">Settings</a>
            </li>
          </ul>
          <ul className="nav navbar-nav ml-auto">
            <li className="nav-item d-md-down-none">
              <a className="nav-link" href="#"><i className="icon-bell"></i><span className="badge badge-pill badge-danger">5</span></a>
            </li>
            <li className="nav-item d-md-down-none">
              <a className="nav-link" href="#"><i className="icon-list"></i></a>
            </li>
            <li className="nav-item d-md-down-none">
              <a className="nav-link" href="#"><i className="icon-location-pin"></i></a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                <img src="img/avatars/6.jpg" className="img-avatar" alt="admin@bootstrapmaster.com"/>
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <div className="dropdown-header text-center">
                  <strong>Account</strong>
                </div>
                <a className="dropdown-item" href="#"><i className="fa fa-bell-o"></i> Updates<span className="badge badge-info">42</span></a>
                <a className="dropdown-item" href="#"><i className="fa fa-envelope-o"></i> Messages<span className="badge badge-success">42</span></a>
                <a className="dropdown-item" href="#"><i className="fa fa-tasks"></i> Tasks<span className="badge badge-danger">42</span></a>
                <a className="dropdown-item" href="#"><i className="fa fa-comments"></i> Comments<span className="badge badge-warning">42</span></a>
                <div className="dropdown-header text-center">
                  <strong>Settings</strong>
                </div>
                <a className="dropdown-item" href="#"><i className="fa fa-user"></i> Profile</a>
                <a className="dropdown-item" href="#"><i className="fa fa-wrench"></i> Settings</a>
                <a className="dropdown-item" href="#"><i className="fa fa-usd"></i> Payments<span className="badge badge-secondary">42</span></a>
                <a className="dropdown-item" href="#"><i className="fa fa-file"></i> Projects<span className="badge badge-primary">42</span></a>
                <div className="divider"></div>
                <a className="dropdown-item" href="#"><i className="fa fa-shield"></i> Lock Account</a>
                <a className="dropdown-item" href="#"><i className="fa fa-lock"></i> Logout</a>
              </div>
            </li>
          </ul>
          <button className="navbar-toggler aside-menu-toggler" type="button">
            <span className="navbar-toggler-icon"></span>
          </button>
      </header>

  <div className="app-body">
    <div className="sidebar">
      <nav className="sidebar-nav">
        <ul className="nav">
          <li className="nav-item">
            <a className="nav-link" href="index.html"><i className="icon-speedometer"></i> Dashboard <span className="badge badge-primary">NEW</span></a>
          </li>

          <li className="nav-title">
            HOME
          </li>
          <li className="nav-item">
            <a href="/notices" className="nav-link"><i className="icon-drop"></i> Notices</a>
          </li>
          <li className="nav-item">
            <a href="typography.html" className="nav-link"><i className="icon-pencil"></i> Meetings</a>
          </li>
          <li className="nav-item">
            <a href="colors.html" className="nav-link"><i className="icon-drop"></i> Surveys</a>
          </li>
          <li className="nav-item">
            <a href="colors.html" className="nav-link"><i className="icon-drop"></i> Forums</a>
          </li>
          <li className="nav-title">
            Components
          </li>
        </ul>
      </nav>
      <button className="sidebar-minimizer brand-minimizer" type="button"></button>
    </div>

    <main className="main">
    <br/><br/>
     

      <div className="container-fluid">
        {forums}
        <div className="animated fadeIn">
        </div>
    </div>
  </main>
    <aside className="aside-menu">
      <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item">
          <a className="nav-link active" data-toggle="tab" href="#timeline" role="tab"><i className="icon-list"></i></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-toggle="tab" href="#messages" role="tab"><i className="icon-speech"></i></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-toggle="tab" href="#settings" role="tab"><i className="icon-settings"></i></a>
        </li>
      </ul>

      <div className="tab-content">
        <div className="tab-pane active" id="timeline" role="tabpanel">
          <div className="callout m-0 py-2 text-muted text-center bg-light text-uppercase">
            <small><b>Today</b></small>
          </div>
          <hr className="transparent mx-3 my-0"/>
          <div className="callout callout-warning m-0 py-3">
            <div className="avatar float-right">
              <img src="img/avatars/7.jpg" className="img-avatar" alt="admin@bootstrapmaster.com"/>
            </div>
            <div>Meeting with
              <strong>Lucas</strong>
            </div>
            <small className="text-muted mr-3"><i className="icon-calendar"></i>&nbsp; 1 - 3pm</small>
            <small className="text-muted"><i className="icon-location-pin"></i>&nbsp; Palo Alto, CA </small>
          </div>
          <hr className="mx-3 my-0"/>
          <div className="callout callout-info m-0 py-3">
            <div className="avatar float-right">
              <img src="img/avatars/4.jpg" className="img-avatar" alt="admin@bootstrapmaster.com"/>
            </div>
            <div>Skype with
              <strong>Megan</strong>
            </div>
            <small className="text-muted mr-3"><i className="icon-calendar"></i>&nbsp; 4 - 5pm</small>
            <small className="text-muted"><i className="icon-social-skype"></i>&nbsp; On-line </small>
          </div>
          <hr className="transparent mx-3 my-0"/>
          <div className="callout m-0 py-2 text-muted text-center bg-light text-uppercase">
            <small><b>Tomorrow</b></small>
          </div>
          <hr className="transparent mx-3 my-0"/>
          <div className="callout callout-danger m-0 py-3">
            <div>New UI Project -
              <strong>deadline</strong>
            </div>
            <small className="text-muted mr-3"><i className="icon-calendar"></i>&nbsp; 10 - 11pm</small>
            <small className="text-muted"><i className="icon-home"></i>&nbsp; creativeLabs HQ </small>
            <div className="avatars-stack mt-2">
              <div className="avatar avatar-xs">
                <img src="img/avatars/2.jpg" className="img-avatar" alt="admin@bootstrapmaster.com"/>
              </div>
              <div className="avatar avatar-xs">
                <img src="img/avatars/3.jpg" className="img-avatar" alt="admin@bootstrapmaster.com"/>
              </div>
              <div className="avatar avatar-xs">
                <img src="img/avatars/4.jpg" className="img-avatar" alt="admin@bootstrapmaster.com"/>
              </div>
              <div className="avatar avatar-xs">
                <img src="img/avatars/5.jpg" className="img-avatar" alt="admin@bootstrapmaster.com"/>
              </div>
              <div className="avatar avatar-xs">
                <img src="img/avatars/6.jpg" className="img-avatar" alt="admin@bootstrapmaster.com"/>
              </div>
            </div>
          </div>
          <hr className="mx-3 my-0"/>
          <div className="callout callout-success m-0 py-3">
            <div>
              <strong>#10 Startups.Garden</strong> Meetup</div>
            <small className="text-muted mr-3"><i className="icon-calendar"></i>&nbsp; 1 - 3pm</small>
            <small className="text-muted"><i className="icon-location-pin"></i>&nbsp; Palo Alto, CA </small>
          </div>
          <hr className="mx-3 my-0"/>
          <div className="callout callout-primary m-0 py-3">
            <div>
              <strong>Team meeting</strong>
            </div>
            <small className="text-muted mr-3"><i className="icon-calendar"></i>&nbsp; 4 - 6pm</small>
            <small className="text-muted"><i className="icon-home"></i>&nbsp; creativeLabs HQ </small>
            <div className="avatars-stack mt-2">
              <div className="avatar avatar-xs">
                <img src="img/avatars/2.jpg" className="img-avatar" alt="admin@bootstrapmaster.com"/>
              </div>
              <div className="avatar avatar-xs">
                <img src="img/avatars/3.jpg" className="img-avatar" alt="admin@bootstrapmaster.com"/>
              </div>
              <div className="avatar avatar-xs">
                <img src="img/avatars/4.jpg" className="img-avatar" alt="admin@bootstrapmaster.com"/>
              </div>
              <div className="avatar avatar-xs">
                <img src="img/avatars/5.jpg" className="img-avatar" alt="admin@bootstrapmaster.com"/>
              </div>
              <div className="avatar avatar-xs">
                <img src="img/avatars/6.jpg" className="img-avatar" alt="admin@bootstrapmaster.com"/>
              </div>
              <div className="avatar avatar-xs">
                <img src="img/avatars/7.jpg" className="img-avatar" alt="admin@bootstrapmaster.com"/>
              </div>
              <div className="avatar avatar-xs">
                <img src="img/avatars/8.jpg" className="img-avatar" alt="admin@bootstrapmaster.com"/>
              </div>
            </div>
          </div>
          <hr className="mx-3 my-0"/>
        </div>
        <div className="tab-pane p-3" id="messages" role="tabpanel">
          <div className="message">
            <div className="py-3 pb-5 mr-3 float-left">
              <div className="avatar">
                <img src="img/avatars/7.jpg" className="img-avatar" alt="admin@bootstrapmaster.com"/>
                <span className="avatar-status badge-success"></span>
              </div>
            </div>
            <div>
              <small className="text-muted">Lukasz Holeczek</small>
              <small className="text-muted float-right mt-1">1:52 PM</small>
            </div>
            <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
            <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...</small>
          </div>
          <hr/>
          <div className="message">
            <div className="py-3 pb-5 mr-3 float-left">
              <div className="avatar">
                <img src="img/avatars/7.jpg" className="img-avatar" alt="admin@bootstrapmaster.com"/>
                <span className="avatar-status badge-success"></span>
              </div>
            </div>
            <div>
              <small className="text-muted">Lukasz Holeczek</small>
              <small className="text-muted float-right mt-1">1:52 PM</small>
            </div>
            <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
            <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...</small>
          </div>
          <hr/>
          <div className="message">
            <div className="py-3 pb-5 mr-3 float-left">
              <div className="avatar">
                <img src="img/avatars/7.jpg" className="img-avatar" alt="admin@bootstrapmaster.com"/>
                <span className="avatar-status badge-success"></span>
              </div>
            </div>
            <div>
              <small className="text-muted">Lukasz Holeczek</small>
              <small className="text-muted float-right mt-1">1:52 PM</small>
            </div>
            <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
            <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...</small>
          </div>
          <hr/>
          <div className="message">
            <div className="py-3 pb-5 mr-3 float-left">
              <div className="avatar">
                <img src="img/avatars/7.jpg" className="img-avatar" alt="admin@bootstrapmaster.com"/>
                <span className="avatar-status badge-success"></span>
              </div>
            </div>
            <div>
              <small className="text-muted">Lukasz Holeczek</small>
              <small className="text-muted float-right mt-1">1:52 PM</small>
            </div>
            <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
            <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...</small>
          </div>
          <hr/>
          <div className="message">
            <div className="py-3 pb-5 mr-3 float-left">
              <div className="avatar">
                <img src="img/avatars/7.jpg" className="img-avatar" alt="admin@bootstrapmaster.com"/>
                <span className="avatar-status badge-success"></span>
              </div>
            </div>
            <div>
              <small className="text-muted">Lukasz Holeczek</small>
              <small className="text-muted float-right mt-1">1:52 PM</small>
            </div>
            <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
            <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...</small>
          </div>
        </div>
        <div className="tab-pane p-3" id="settings" role="tabpanel">
          <h6>Settings</h6>

          <div className="aside-options">
            <div className="clearfix mt-4">
              <small><b>Option 1</b></small>
              <label className="switch switch-text switch-pill switch-success switch-sm float-right">
                <input type="checkbox" className="switch-input" checked=""/>
                <span className="switch-label" data-on="On" data-off="Off"></span>
                <span className="switch-handle"></span>
              </label>
            </div>
            <div>
              <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</small>
            </div>
          </div>

          <div className="aside-options">
            <div className="clearfix mt-3">
              <small><b>Option 2</b></small>
              <label className="switch switch-text switch-pill switch-success switch-sm float-right">
                <input type="checkbox" className="switch-input"/>
                <span className="switch-label" data-on="On" data-off="Off"></span>
                <span className="switch-handle"></span>
              </label>
            </div>
            <div>
              <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</small>
            </div>
          </div>

          <div className="aside-options">
            <div className="clearfix mt-3">
              <small><b>Option 3</b></small>
              <label className="switch switch-text switch-pill switch-success switch-sm float-right">
                <input type="checkbox" className="switch-input"/>
                <span className="switch-label" data-on="On" data-off="Off"></span>
                <span className="switch-handle"></span>
              </label>
            </div>
          </div>

          <div className="aside-options">
            <div className="clearfix mt-3">
              <small><b>Option 4</b></small>
              <label className="switch switch-text switch-pill switch-success switch-sm float-right">
                <input type="checkbox" className="switch-input" checked=""/>
                <span className="switch-label" data-on="On" data-off="Off"></span>
                <span className="switch-handle"></span>
              </label>
            </div>
          </div>

          <hr/>
          <h6>System Utilization</h6>

          <div className="text-uppercase mb-1 mt-4">
            <small><b>CPU Usage</b></small>
          </div>
          <div className="progress progress-xs">
            <div className="progress-bar bg-info" role="progressbar" style={{width: '25%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <small className="text-muted">348 Processes. 1/4 Cores.</small>

          <div className="text-uppercase mb-1 mt-2">
            <small><b>Memory Usage</b></small>
          </div>
          <div className="progress progress-xs">
            <div className="progress-bar bg-warning" role="progressbar" style={{width: '70%'}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <small className="text-muted">11444GB/16384MB</small>

          <div className="text-uppercase mb-1 mt-2">
            <small><b>SSD 1 Usage</b></small>
          </div>
          <div className="progress progress-xs">
            <div className="progress-bar bg-danger" role="progressbar" style={{width: '95%'}} aria-valuenow="95" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <small className="text-muted">243GB/256GB</small>

          <div className="text-uppercase mb-1 mt-2">
            <small><b>SSD 2 Usage</b></small>
          </div>
          <div className="progress progress-xs">
            <div className="progress-bar bg-success" role="progressbar" style={{width: '10%'}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <small className="text-muted">25GB/256GB</small>
        </div>
      </div>
    </aside>

  </div>

  <footer className="app-footer">
    <span><a href="http://coreui.io">Telos</a> © 2018</span>
    <span className="ml-auto">Powered by <a href="http://telos-technology.com">TELOS-Technology</a></span>
  </footer>

  

</div>     
    )
  }
}

export default reduxForm({
  form: 'login',  // a unique identifier for this form
  destroyOnUnmount: true,
})(ForumForm)
