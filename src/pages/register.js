import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { useForm } from '../util/form';
import { registerUser } from '../actions/user';




function Register(props) {
    const { isAuthenticated, errors } = useSelector(state => state.user)
    const dispatch = useDispatch()


    const { onChange, onSubmit, values } = useForm(registerUserCallBack, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    function registerUserCallBack() {
        dispatch(registerUser(values));
    }


    if (isAuthenticated) {
        return <Redirect to='/'/>;
    };
    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate >
                <h1>Register</h1>
                <Form.Input
                    label='Username'
                    name='username'
                    type='text'
                    placehoder='Username...'
                    value={values.username}
                    onChange={onChange}
                />
                <Form.Input
                    label='Email'
                    name='email'
                    placehoder='Email...'
                    type='text'
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
                <Form.Input
                    label='Comfirm Password'
                    name='confirmPassword'
                    placehoder='Confirm password...'
                    type='password'
                    value={values.confirmPassword}
                    onChange={onChange}
                />
                <Button type='submit' primary>Register</Button>
            </Form>
            {errors.errors && Object.keys(errors.errors).length > 0 && (
                <div className='ui error message'>
                    <ul className='list'>
                        {Object.values(errors.errors).map(value => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )
            }
        </div>
    )
}


export default Register;