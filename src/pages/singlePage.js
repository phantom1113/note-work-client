import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Card, Button, Icon, Label, Image, Form, Responsive } from 'semantic-ui-react';
import moment from 'moment';
import { convertToken } from '../util/convertToken';
import { getPost } from '../actions/posts';
import { createComment } from '../actions/posts';
import { clearError } from '../actions/posts';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import UpdateButton from '../components/UpdateButton';


function SinglePost(props) {
    const dispatch = useDispatch()
    const postId = props.match.params.postId;
    const [comment, setComment] = useState('');
    const { user, isAuthenticated } = useSelector(state => state.user)
    const { post, loading_post, errors } = useSelector(state => state.posts)
    const nameAuth = convertToken(user.token ? user.token : '')
    let postMarkup;
    const deletePostCallback = () => {
        props.history.push('/')
    }
    useEffect(() => {
        dispatch(getPost(postId))
    }, [dispatch, postId])
    console.log(user)
    if (loading_post) {
        postMarkup = <p>Loading post...</p>
    } else {
        const { _id, body, createdAt, username, comments, likes, urlAvatar } =
            post;
        postMarkup = (
            <React.Fragment>
                <Responsive minWidth={992}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={2}>
                                <Image
                                    floated='right'
                                    size='small'
                                    src={urlAvatar}
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
                                        <LikeButton post={{ _id, likeCount: likes.length, likes }} />
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
                                        {nameAuth && nameAuth === username &&
                                            <Button.Group floated='right'>
                                                <DeleteButton postId={_id} callback={deletePostCallback} />
                                            </Button.Group>
                                        }
                                    </Card.Content>
                                </Card>
                                {isAuthenticated && <Card fluid>
                                    <Card.Content>
                                        <p>Post a comment</p>
                                        <Form>
                                            <div className='ui action input fluid'>
                                                <input
                                                    type='text'
                                                    value={comment}
                                                    placeholder='comment'
                                                    onChange={(event) => setComment(event.target.value)}
                                                    onFocus={() => dispatch(clearError())}
                                                />
                                                <Button
                                                    type='submit'
                                                    className='ui button teal'
                                                    onClick={() => {
                                                        dispatch(createComment(_id, comment))
                                                        setComment('')
                                                    }}
                                                >
                                                    Submit
                                        </Button>
                                            </div>
                                        </Form>
                                    </Card.Content>
                                </Card>}
                                {errors.errors && (
                                    <div className="ui error message" style={{ marginBottom: 20 }}>
                                        <ul className="list">
                                            <li>{errors.errors}</li>
                                        </ul>
                                    </div>
                                )}
                                {comments.map(comment => {
                                    return (
                                        <Card fluid key={comment._id}>
                                            <Card.Content>
                                                {nameAuth && nameAuth === comment.username && (
                                                    <Button.Group floated='right'>
                                                        <DeleteButton postId={_id} commentId={comment._id} />
                                                        <UpdateButton postId={_id} commentId={comment._id} />
                                                    </Button.Group>
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
                </Responsive>
                <Responsive maxWidth={991}>
                    <Card centered fluid>
                        <Card.Content>
                            <Image
                                floated='right'
                                size='mini'
                                src={urlAvatar}
                            />
                            <Card.Header>{username}</Card.Header>
                            <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                            <Card.Description>{body}</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className='ui buttons right floated '>
                                <DeleteButton postId={_id} callback={deletePostCallback} />
                            </div>
                            <div className='ui buttons left floated '>
                                <LikeButton post={{ _id, likeCount: likes.length, likes }} />
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
                            </div>
                        </Card.Content>
                    </Card>
                    {isAuthenticated && <Card fluid>
                        <Card.Content>
                            <p>Post a comment</p>
                            <Form>
                                <div className='ui action input fluid'>
                                    <input
                                        type='text'
                                        value={comment}
                                        placeholder='comment'
                                        onChange={(event) => setComment(event.target.value)}
                                        onFocus={() => dispatch(clearError())}
                                    />
                                    <Button
                                        type='submit'
                                        className='ui button teal'
                                        onClick={() => {
                                            dispatch(createComment(_id, comment))
                                            setComment('')
                                        }}
                                    >
                                        Submit
                                        </Button>
                                </div>
                            </Form>
                        </Card.Content>
                    </Card>}
                    {errors.errors && (
                        <div className="ui error message" style={{ marginBottom: 20 }}>
                            <ul className="list">
                                <li>{errors.errors}</li>
                            </ul>
                        </div>
                    )}
                    {comments.map(comment => {
                        return (
                            <Card fluid key={comment._id}>
                                <Card.Content>
                                    {nameAuth && nameAuth === comment.username && (
                                        <Button.Group floated='right'>
                                            <DeleteButton postId={_id} commentId={comment._id} />
                                            <UpdateButton postId={_id} commentId={comment._id} />
                                        </Button.Group>
                                    )}
                                    <Card.Header>{comment.username}</Card.Header>
                                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                                    <Card.Description>{comment.body}</Card.Description>
                                </Card.Content>
                            </Card>
                        )
                    }
                    )}
                </Responsive>
            </React.Fragment>
        )
    }
    return postMarkup;
}

export default SinglePost;