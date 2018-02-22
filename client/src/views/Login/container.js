import { connect } from 'react-redux'
import {loginUser, handleSignOut} from '../../store/user/duck'
import LoginForm from './component'
const Login = connect(
  (state) => ({
    user: state.user.user,
    isSubmitting: state.user.isSubmitting,
    rxError: state.user.error,
    phase: state.user.phase 
  }),
  {
    loginUser,
    handleSignOut
  }
)(LoginForm)
export default Login
