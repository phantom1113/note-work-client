import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'semantic-ui-react'
import { clearErrorUser } from '../actions/user';


function ExpireTokenMessage() {
    const { errors } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const isExpired = errors.errors === "Token is expired" ? true : false;

    return (
        <div>
            <Modal
                open={isExpired}
                header='Reminder!'
                content='Your session is expired'
                onClose={() => dispatch(clearErrorUser())}
            />
        </div>
    )
}

export default ExpireTokenMessage;
