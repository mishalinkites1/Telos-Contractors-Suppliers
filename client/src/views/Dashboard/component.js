import React, { PureComponent } from 'react'
import PropTypes from "prop-types"
import { Redirect, Link } from 'react-router-dom'
import { AppBar } from 'material-ui'
import { Container, Row, Col, } from 'react-grid-system'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/arrow-upward'
import SideNavigation from '../../components/sideNavigation';
import TopNavigation from '../../components/topNavigation';

import Header from '../../components/topNavigation'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import ActionInfo from 'material-ui/svg-icons/navigation/arrow-drop-up'
import './styles.scss'
import Drawer from 'material-ui/Drawer';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  border:'1px solid #000',
};

export default class dashboard extends React.Component { 
  constructor(props) {
    super(props)
    this.state = {open: false};
  }
  componentWillMount(){
    localStorage.removeItem('scrollTo')
  }
  handleToggle = () => this.setState({open: !this.state.open});

  render() {  
    let user = JSON.parse(window.localStorage.getItem("user"))
    const style = {
      margin: 12,
    };
    let role = user.account
      const currentLocation = location.pathname
    return (
    <div>
        <SideNavigation/>
        {/* Aside Ends*/}
        {/*Main Content Start */}
        <section className="content">
          {/* Header */}
          <TopNavigation/>
          {/* Header Ends */}
          {/* Page Content Start */}
          {/* ================== */}
          <div className="wraper container-fluid">
          
            <div className="page-title"> 
              <h3 className="title">Welcome !</h3> 
            </div>
                      </div>
          {/* Page Content Ends */}
          {/* ================== */}
          {/* Footer Start */}
          {/* Footer Ends */}
        </section>
      </div>    
    );
  }
} 