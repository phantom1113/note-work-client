import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Loader,Responsive } from 'semantic-ui-react';
import { useForm } from '../util/form';
import { registerUser } from '../actions/user';




function Register(props) {
    const { isAuthenticated, errors } = useSelector(state => state.user)
    const dispatch = useDispatch()


    const { onChange, onSubmit, values } = useForm(registerUserCallBack, {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        imageAvatar: Object
    });

    function registerUserCallBack() {
        dispatch(registerUser(values));
    }


    if (isAuthenticated) {
        props.history.goBack();
        return <Loader active inline='centered' />
    };
    return (
        <React.Fragment>
        <Responsive maxWidth={991}>
        <div>
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
        </Responsive>
        <Responsive minWidth={992}>
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
                <Form.Input name='imageAvatar' onChange={onChange} label='Image Avatar' type="file" placeholder='Search...' />
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
        </Responsive>
        </React.Fragment>
    )
}


export default Register;