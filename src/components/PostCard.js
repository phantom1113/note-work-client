import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';



function PostCard({post: {body, createdAt, _id, username, comments, likes} , nameAuth}){

    return (
        <Card>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${_id}`}>
                    {moment(createdAt).fromNow(true)}
                </Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button labelPosition='right' as={Link} to={`/posts/${_id}`}>
                    <Button color='blue' basic>
                        <Icon name='comment'/>
                    </Button>
                    <Label  basic color='blue' pointing='left'>
                        {comments.length}
                    </Label>
                </Button>
                <LikeButton post={{ _id, likeCount:likes.length, likes }} />
                { nameAuth && nameAuth === username && <DeleteButton postId={_id} />}
            </Card.Content>
        </Card>
    )

}

export default PostCard;