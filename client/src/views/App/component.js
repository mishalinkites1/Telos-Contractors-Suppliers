import React, { Component } from 'react'
import PropTypes from "prop-types"
import {
  Router,
  Route,
  Redirect
} from 'react-router-dom'
import Config from '../../config'
import createHistory from 'history/createBrowserHistory'
import Dashboard from '../Dashboard/container'
import SideNavigation from '../../components/sideNavigation'
import TopNavigation from '../../components/topNavigation'
import Login from '../Login/container'
import NoticeBoard from '../NoticeBoard/container'
import Forum from '../forum/container'
import Register from '../Register/container'
import UserModel from '../../store/user/user-model'
import * as Phase from '../../constants/phase'
import Blank from '../Blank/container'
import locale from 'browser-locale'

const history = createHistory()
const PUBLIC_URL = process.env.PUBLIC_URL
const PrivateRoute = ({ component, ...rest }) => {
  let user = window.localStorage.getItem("user")
  const isAuthed = (user ? true : false)
  return (
    <Route {...rest} exact
      render = {(props) => (
        isAuthed ? (
          <div>
            {React.createElement(component, props)}
          </div>
        ) :
        (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      )}
    />
  )
}
PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func
  ]).isRequired,
  location: PropTypes.object,
   redirectURL: PropTypes.string
}
class App extends Component {
  static contextTypes = {
    router: PropTypes.object
  }
  static propTypes = {
    token: PropTypes.string,
    phase: PropTypes.string,   
  }
 
  render() {
    let userData ={}
    const {
      user,
      token,
      phase,
      redirectURL
    } = this.props
    return (
      <Router history={history}>
        <div className="App-pageContainer">
          <Route exact path="/" render={() =>
          <Redirect to="/login" />} />
          <Route path={'/login'} component={Login} />
          <Route path={'/register'} component={Register} />
          <PrivateRoute path={'/dashboard'} user={user} component={Dashboard} />
          
          <PrivateRoute path={'/forum'} user={user} component={Forum} />
          <PrivateRoute exact path={'/notices'} user={user} component={NoticeBoard} />
        </div>
      </Router>
    )
  }
}
export default App
