import { connect } from 'react-redux'
import {fetchUser} from '../../store/user/duck'
import AppComponent from './component'
const AppContainer = connect(
  (state) => ({
   user: state.user.user,
    token: state.user.token,
    isSubmitting: state.user.isSubmitting,
    rxError: state.user.error,
    phase: state.user.phase 
  }),
 {
    fetchUser
  }
)(AppComponent)
export default AppContainer
