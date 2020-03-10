import React from 'react';
import Home from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/register';
import SinglePage from '../pages/singlePage';



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
    },
    {
        path: '/posts/:postId',
        exact: true,
        main: ({ history, match }) => {
            return (
                <div>
                    <SinglePage history={history} match={match} />
                </div>
            )
        }
    }
];

export default routes;