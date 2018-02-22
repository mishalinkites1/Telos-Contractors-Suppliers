import { connect } from 'react-redux'

import {fetchForum,saveComment,likePost,clearPhase} from '../../store/forum/duck'

import ForumForm from './component'

const Forum = connect(
  (state) => ({
      forum: state.forum.forums,
      createPhase: state.forum.createPhase,
      likePostPhase: state.forum.likePostPhase,
  }),
  {
    fetchForum,
    saveComment,
    likePost,
    clearPhase
  }
)(ForumForm)

export default Forum
