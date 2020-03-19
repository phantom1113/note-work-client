import React, { useState } from 'react';
import { Button, Confirm, Icon } from 'semantic-ui-react';
import { useDispatch } from 'react-redux'
import { deletePost } from '../actions/posts';
import { deleteComment } from '../actions/posts';


function DeleteButton({ postId, commentId, callback }) {

  const [confirmOpen, setConfirmOpen] = useState(false)
  
  const dispatch = useDispatch();

  const DeletePostandComment = (postId, commentId, callback) => {
    if (callback) {
      dispatch(deletePost(postId, callback));
    } else {
      if (commentId) {
        dispatch(deleteComment(postId, commentId))
      } else {
        dispatch(deletePost(postId))
      }
    }
  }

  return (
    <React.Fragment>
      {/* <MyPopup
        // content={commentId ? 'Delete comment' : 'Delete post'}
        > */}
      <Button
        as="div"
        color="red"
        floated="right"
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      {/* </MyPopup> */}
      <Confirm
        content = {commentId ? 'Are you sure to delete this comment ?' : 'Are you sure to delete this post ?'}
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={()=> {
          setConfirmOpen(false);
          DeletePostandComment(postId, commentId, callback);
        }}
      />
    </React.Fragment>
  );
}


export default DeleteButton;