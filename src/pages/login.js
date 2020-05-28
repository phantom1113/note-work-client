import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Loader, Responsive } from 'semantic-ui-react';
import { useForm } from '../util/form';
import { loginUser, clearErrorUser } from '../actions/user'

function Login({ history }) {
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
        history.goBack();
        return <Loader active inline='centered' />
    };
    return (
        <React.Fragment>
            <Responsive maxWidth={991}>
                <div>
                    <Form onSubmit={onSubmit} noValidate >
                        <h1>Login</h1>
                        <Form.Input
                            label='Email'
                            name='email'
                            type='email'
                            placehoder='Email...'
                            value={values.email}
                            onChange={onChange}
                            onFocus={() => dispatch(clearErrorUser())}
                        />
                        <Form.Input
                            label='Password'
                            name='password'
                            placehoder='Password...'
                            type='password'
                            value={values.password}
                            onChange={onChange}
                            onFocus={() => dispatch(clearErrorUser())}
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
            </Responsive>
            <Responsive minWidth={992}>
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
                            onFocus={() => dispatch(clearErrorUser())}
                        />
                        <Form.Input
                            label='Password'
                            name='password'
                            placehoder='Password...'
                            type='password'
                            value={values.password}
                            onChange={onChange}
                            onFocus={() => dispatch(clearErrorUser())}
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
            </Responsive>
        </React.Fragment>
    )
}


export default Login;