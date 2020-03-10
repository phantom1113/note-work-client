import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { useForm } from '../util/form';
import { createPost, clearError } from '../actions/posts';


function PostForm(props) {

    const dispatch = useDispatch()
    const {errors} = props.errors
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
                        error={errors? true: false}
                        onFocus={() => dispatch(clearError())}
                    />
                    <Button type="submit" color="teal">
                        Submit
                    </Button>
                </Form.Field>
            </Form>
            {errors && (
                <div className="ui error message" style={{ marginBottom: 20 }}>
                    <ul className="list">
                        <li>{errors}</li>
                    </ul>
                </div>
            )}
        </>
    );
}

export default PostForm;