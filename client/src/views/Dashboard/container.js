import { connect } from 'react-redux'
import {getDashboardData} from '../../store/dashboard/duck'
import {handleSignOut} from '../../store/user/duck'
import Dashboard from './component'
const DashboardContainer = connect(
  (state) => ({
  	DashboardData: state.dashboard.dashboardData
  }),
  {
   handleSignOut,
   getDashboardData,
  }
)(Dashboard)
export default DashboardContainer
