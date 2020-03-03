import React from 'react';
import { Redirect } from 'react-router-dom';
import Home from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/register';
import SinglePage from '../pages/singlePage';
import checkAuth from '../util/checkAuth';



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
            if(checkAuth()){
                return <Redirect to='/'/>
            }
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
            if(checkAuth()){
                return <Redirect to='/'/>
            }
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