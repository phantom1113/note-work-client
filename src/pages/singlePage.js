import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Card, Button, Icon, Label, Image, Form } from 'semantic-ui-react';
import moment from 'moment';
import { convertToken } from '../util/convertToken';
import { getPost } from '../actions/posts'
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

function SinglePost(props) {
    const dispatch = useDispatch()
    const postId = props.match.params.postId;
    const { user } = useSelector(state => state.user)
    const { post,loading_post } = useSelector(state => state.posts)
    const nameAuth = convertToken(user.token ? user.token : '')
    let postMarkup;

    const deletePostCallback = () => {
        props.history.push('/')
    }
    
    useEffect(() => {
        dispatch(getPost(postId))
    },[dispatch, postId])

    if (loading_post) {
        postMarkup = <p>Loading post...</p>
    } else {
        const { _id, body, createdAt, username, comments, likes } =
            post;

        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                            floated='right'
                            size='small'
                            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content>
                                <LikeButton post={{ _id, likeCount:likes.length, likes }} />
                                <Button
                                    as='div'
                                    labelPosition='right'
                                    onClick={() => {
                                        console.log('Comment on Post');
                                    }}
                                >
                                    <Button basic color='blue'>
                                        <Icon name='comments' />
                                    </Button>
                                    <Label basic color='blue' pointing='left'>
                                        {comments.length}
                                    </Label>
                                </Button>
                                {nameAuth && nameAuth === username && <DeleteButton postId={_id} callback={deletePostCallback} />}
                            </Card.Content>
                        </Card>
                        {user && <Card fluid>
                            <Card.Content>
                                <p>Post a comment</p>
                                <Form>
                                    <div className='ui action input fluid'>
                                        <input
                                            type='text'
                                            placeholder='comment'
                                            onChange={() => console.log('Event change comment')}
                                        />
                                        <Button
                                            type='submit'
                                            className='ui button teal'
                                            onClick={()=>console.log('submit comment')}
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Content>
                        </Card>}
                        {comments.map(comment => {
                            return (
                                <Card fluid key={comment._id}>
                                    <Card.Content>
                                        {user && user.username === comment.username && (
                                            <DeleteButton postId={_id} commentId={comment.id} />
                                        )}
                                        <Card.Header>{comment.username}</Card.Header>
                                        <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                                        <Card.Description>{comment.body}</Card.Description>
                                    </Card.Content>
                                </Card>
                            )
                        }
                        )}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
    return postMarkup;
}

export default SinglePost;