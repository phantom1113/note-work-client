import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts, loadingPost } from '../actions/posts';
import { Grid, Transition, Dimmer, Loader, Responsive, Input } from 'semantic-ui-react';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { convertToken } from '../util/convertToken';



function Home() {
  const dispatch = useDispatch()
  const { posts, loading, errors } = useSelector(state => state.posts)
  const { isAuthenticated, user } = useSelector(state => state.user)
  const nameAuth = convertToken(user.token ? user.token : '')

  useEffect(() => {
    dispatch(getPosts());
    dispatch(loadingPost())
  }, [dispatch])
  return (
    <React.Fragment>
      <Responsive maxWidth={991}>
        <Grid>
          <Grid.Row className="page-title">
            <Grid.Column>
              <h1>Recent Posts</h1>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row >
            <Grid.Column textAlign='center'>
              <Input icon='search' placeholder='Search...' />
            </Grid.Column>
          </Grid.Row>
          {
            loading ? (
              <Dimmer active inverted>
                <Loader size='large' inline='centered'>Loading</Loader>
              </Dimmer>
            ) : (
                <React.Fragment>
                  <Grid.Row>
                    {isAuthenticated && (
                      <Grid.Column style={{ marginBottom: '1rem' }}>
                        <PostForm errors={errors} />
                      </Grid.Column>
                    )}
                  </Grid.Row>
                  <Transition.Group>
                    {posts &&
                      posts.map((post) => (
                        <Grid.Row key={post._id}>
                          <Grid.Column key={post._id}>
                            <PostCard centered={true} post={post} nameAuth={nameAuth} />
                          </Grid.Column>
                        </Grid.Row>
                      ))}
                  </Transition.Group>
                </React.Fragment>
              )
          }

        </Grid>
      </Responsive>
      <Responsive minWidth={992}>
        <Grid columns={3}>
          <Grid.Row className="page-title">
            <h1>Recent Posts</h1>
          </Grid.Row>
          <Grid.Row >
            <Grid.Column>
              <Input icon='search' placeholder='Search...' />
            </Grid.Column>
          </Grid.Row>
          {loading ?
            (
              <Dimmer active inverted>
                <Loader size='large' inline='centered'>Loading</Loader>
              </Dimmer>
            ) :
            (<Grid.Row>
              {isAuthenticated && (
                <Grid.Column style={{ marginBottom: '1.5rem' }}>
                  <PostForm errors={errors} />
                </Grid.Column>
              )}
              <Transition.Group>
                {posts &&
                  posts.map((post) => (
                    <Grid.Column key={post._id} style={{ marginBottom: '1.5rem' }}>
                      <PostCard centered={false} post={post} nameAuth={nameAuth} />
                    </Grid.Column>
                  ))}
              </Transition.Group>
            </Grid.Row>)
          }
        </Grid>
      </Responsive>
    </React.Fragment>
  );

}

export default Home;