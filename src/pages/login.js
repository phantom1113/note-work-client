import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import { useForm } from '../util/form';
import { loginUser } from '../actions/user'

function Login(props) {
    const { isAuthenticated, errors } = useSelector(state => state.user)


    const dispatch = useDispatch()

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        email: '',
        password: '',
    });

    function loginUserCallback() {
        dispatch(loginUser(values));
    }

    if (isAuthenticated) {
        return <Redirect to='/'/>;
    };
    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate >
                <h1>Login</h1>
                <Form.Input
                    label='Email'
                    name='email'
                    type='email'
                    placehoder='Email...'
                    value={values.email}
                    onChange={onChange}
                />
                <Form.Input
                    label='Password'
                    name='password'
                    placehoder='Password...'
                    type='password'
                    value={values.password}
                    onChange={onChange}
                />
                <Button type='submit' primary>Login</Button>
            </Form>
            {errors.errors && (
                <div className='ui error message'>
                    <ul className='list'>
                        <li key={errors.errors}>{errors.errors}</li>
                    </ul>
                </div>
            )
            }
        </div>
    )
}


export default Login;