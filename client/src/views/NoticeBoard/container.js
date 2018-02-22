import { connect } from 'react-redux'
import {fetchNotices,clearPhase,submitNotice} from '../../store/noticeboard/duck'
import {handleSignOut} from '../../store/user/duck'
import noticeBoardForm from './component'
const noticeBoards = connect(
  (state) => ({
    isSubmitting: state.noticeBoard.isSubmitting,
    fetchPhase: state.noticeBoard.fetchPhase,
    deletePhase: state.noticeBoard.deletePhase,
    Notices: state.noticeBoard.notices,
    rxError: state.noticeBoard.error,
    submitPhase: state.noticeBoard.submitPhase,
  }),
  {
    fetchNotices,
    submitNotice,
    handleSignOut,
    clearPhase
  }
)(noticeBoardForm)
export default noticeBoards
