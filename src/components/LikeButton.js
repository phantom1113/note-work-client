import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { convertToken } from '../util/convertToken';
import { Button, Icon, Label } from 'semantic-ui-react';
import { likePost } from '../actions/posts';

function LikeButton({ post: { _id, likeCount, likes } }) {
    const { token } = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const [liked, setLiked] = useState(false);
    useEffect(() => {
        if (token !== '') {
            if (likes.find(like => like.username === convertToken(token))) {
                setLiked(true)
            }
            else{
                setLiked(false)
            }
        } else {
            setLiked(false)
        }
    }, [token, likes])

    const likeButton = token !== '' ? (
        liked ? (
            <Button color='teal'>
                <Icon name='heart' />
            </Button>
        ) : (
                <Button color='teal' basic>
                    <Icon name='heart' />
                </Button>
            )
    ) : (
            <Button as={Link} to='/login' color='teal' basic>
                <Icon name='heart' />
            </Button>
        )
    return (
        <Button as='div' labelPosition='right' onClick={() => {
            dispatch(likePost(_id))
            }}>
            {likeButton}
            <Label basic color='teal' pointing='left'>
                {likeCount}
            </Label>
        </Button>
    )
}



export default LikeButton;