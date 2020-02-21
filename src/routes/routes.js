import React from 'react';
import Home from '../pages/home';

const routes = [
    {
        path: '/',
        exact: true,
        main: () => {
            return (
                <div>
                    <Home/>
                </div>
            )
        }
    }
];

export default routes;