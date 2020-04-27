import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { logoutUser, clearErrorUser } from '../actions/user'




function MenuBar(prop) {
    let history = useHistory();
    const { isAuthenticated, user } = useSelector(state => state.user)

    const dispatch = useDispatch()

    const initialState = {
        user: null
    }

    if (user.token !== '') {
        const decodedToken = jwtDecode(user.token);

        // if (decodedToken.exp * 1000 < Date.now()) {
        //     localStorage.removeItem('jwtToken');
        // } else {
        //     initialState.user = decodedToken;
        // }
        initialState.user = decodedToken;
    }


    const path = history.location.pathname === '/' ? 'home' : history.location.pathname.substr(1);
    const [activeItem, setActiveItem] = useState(path);

    const handleItemClick = (e, { name }) =>{ 
        setActiveItem(name);
        dispatch(clearErrorUser())
    };

    useEffect(() => {
        setActiveItem(path);
        console.log('render')
    },[path]);

    const menuBar = isAuthenticated ? (
        <Menu pointing secondary size='massive' color='teal'>
            <Menu.Item
                name={initialState.user.username}
                active
                as={Link}
                to='/'
            />
            <Menu.Menu position='right'>
                <Menu.Item
                    name='logout'
                    as={Link}
                    to='/'
                    onClick={() => {
                        dispatch(logoutUser())
                    }}
                />
            </Menu.Menu>
        </Menu>) :
        (
            <Menu pointing secondary size='massive' color='teal'>
                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/'
                />
                <Menu.Menu position='right'>
                    <Menu.Item
                        name='login'
                        active={activeItem === 'login'}
                        onClick={handleItemClick}
                        as={Link}
                        to='/login'
                    />
                    <Menu.Item
                        name='register'
                        active={activeItem === 'register'}
                        onClick={handleItemClick}
                        as={Link}
                        to='/register'
                    />
                </Menu.Menu>
            </Menu>
        )

    return menuBar
}

export default MenuBar;