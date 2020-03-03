import React from 'react';
import { Button, Confirm, Icon } from 'semantic-ui-react';
import { useDispatch } from 'react-redux'
import { deletePost } from '../actions/posts';



function DeleteButton({postId, callback}) {
  
  const dispatch = useDispatch();

  const DeletePostandComment = (id,callback) => {
      if(callback){
        dispatch(deletePost(id,callback));
      } else {
        dispatch(deletePost(id))
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
          onClick={() => DeletePostandComment(postId, callback)}
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      {/* </MyPopup> */}
      <Confirm
        // open={confirmOpen}
        // onCancel={() => setConfirmOpen(false)}
      />
    </React.Fragment>
  );
}


export default DeleteButton;