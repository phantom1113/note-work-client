import React, { useState } from 'react';
import { Button, Icon, Form, Modal } from 'semantic-ui-react';
import { useDispatch } from 'react-redux'
import { useForm } from '../util/form';
import { updateComment } from '../actions/posts';
import { clearError } from '../actions/posts';


function UpdateButton({ postId, commentId }) {

  const [modalOpen, setModalOpen] = useState(false)
  const { values, onChange, onSubmit } = useForm(updateCommentCallback, {
    body: '',
  });
  const dispatch = useDispatch();

  function updateCommentCallback() {
    dispatch(updateComment(postId,commentId,values));
    setModalOpen(false);
  }

  return (
    <React.Fragment>
      {/* <MyPopup
        // content={commentId ? 'Delete comment' : 'Delete post'}
        > */}
      <Modal
        trigger={<Button
          as="div"
          color="teal"
          floated="right"
          onClick={() =>{ 
            dispatch(clearError())
            setModalOpen(true)
          }}
        >
          <Icon name="pencil" style={{ margin: 0 }} />
        </Button>}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        basic
        size='small'
      >
        <Modal.Content>
          <Form onSubmit={onSubmit} >
            <h2>Update comment:</h2>
            <Form.Field>
              <Form.Input
                placeholder="Hi World!"
                name="body"
                onChange={onChange}
                value={values.body}
              />
              <Button type="submit" color="teal" >
                Submit
              </Button>
            </Form.Field>
          </Form>
        </Modal.Content>
      </Modal>
      {/* </MyPopup> */}
    </React.Fragment>
  );
}


export default UpdateButton;