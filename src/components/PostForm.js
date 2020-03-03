import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { useForm } from '../util/form';
import { createPost } from '../actions/posts';


function PostForm() {

    const dispatch = useDispatch()

    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        body: '',
    });


    function createPostCallback() {
        dispatch(createPost(values))
    }

    return (
        <>
            <Form onSubmit={onSubmit}>
                <h2>Create a post:</h2>
                <Form.Field>
                    <Form.Input
                        placeholder="Hi World!"
                        name="body"
                        onChange={onChange}
                        value={values.body}
                    />
                    <Button type="submit" color="teal">
                        Submit
          </Button>
                </Form.Field>
            </Form>
            {/* {error && (
                <div className="ui error message" style={{ marginBottom: 20 }}>
                    <ul className="list">
                        <li>{error.graphQLErrors[0].message}</li>
                    </ul>
                </div>
            )} */}
        </>
    );
}

export default PostForm;