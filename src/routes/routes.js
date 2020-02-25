import React from 'react';
import Home from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/register';

const routes = [
    {
        path: '/',
        exact: true,
        main: () => {
            return (
                <div>
                    <Home />
                </div>
            )
        }
    },
    {
        path: '/login',
        exact: true,
        main: ({ history }) => {
            return (
                <div>
                    <Login history={history} />
                </div>
            )
        }
    },
    {
        path: '/register',
        exact: true,
        main: ({ history }) => {
            return (
                <div>
                    <Register history={history} />
                </div>
            )
        }
    }
];

export default routes;