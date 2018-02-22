import { connect } from 'react-redux'

import {registerUser, handleSignOut} from '../../store/user/duck'
import RegisterForm from './component'

const Register = connect(
  (state) => ({
      registerPhase: state.user.registerPhase,
      registerData: state.user.registerData
  }),
  {
    registerUser,
  }
)(RegisterForm)

export default Register
