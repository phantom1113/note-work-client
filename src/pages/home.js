import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts, loadingPost } from '../actions/posts';
import { Grid, Transition, Dimmer, Loader } from 'semantic-ui-react';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { convertToken } from '../util/convertToken';



function Home() {
  const dispatch = useDispatch()
  const { posts, loading } = useSelector(state => state.posts)
  const{ isAuthenticated, user } = useSelector(state => state.user)
  const nameAuth = convertToken(user.token ? user.token : '')

  useEffect(() => {
    dispatch(getPosts());
    dispatch(loadingPost())
  }, [dispatch])
  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      {loading ?
        (
          <Dimmer active inverted>
            <Loader size='large' inline='centered'>Loading</Loader>
          </Dimmer>
        ):
        (<Grid.Row>
          {isAuthenticated && (
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          )}
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post._id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} nameAuth={nameAuth} />
                </Grid.Column>
              ))}
          </Transition.Group>
      </Grid.Row>)
      }
    </Grid>
  );

}

export default Home;