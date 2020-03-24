import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts, loadingPost } from '../actions/posts';
import { Grid, Dimmer, Loader, Responsive, Input, Pagination } from 'semantic-ui-react';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { searchPost } from '../actions/posts'
import { convertToken } from '../util/convertToken';



function Home() {
  const dispatch = useDispatch()
  const { posts, loading, errors } = useSelector(state => state.posts);
  const { isAuthenticated, user } = useSelector(state => state.user);
  const nameAuth = convertToken(user.token ? user.token : '');
  const [activePage, setActivePage] = useState(1)
  const totalPages = Math.ceil(posts.length / 3);

  const onChange = (event) => {
    dispatch(searchPost(event.target.value))
  };

  const handlePaginationChange = (e, { activePage }) => {
    setActivePage(activePage)
  }

  const itemPage = (activePage) => {
    if (posts.length !== 0) {
      if (posts.slice((activePage - 1) * 3, activePage * 3).length !== 0) {
        return posts.slice((activePage - 1) * 3, activePage * 3)
      } else {
        let temp = activePage - 1
        setActivePage(activePage - 1)
        return posts.slice((temp - 1) * 3, temp * 3)
      }
    } else {
      return []
    }
  }

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
              <Input icon='search' placeholder='Search...' onChange={onChange} />
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
                    {posts.length !== 0 &&
                      posts.map((post) => (
                        <Grid.Row key={post._id}>
                          <Grid.Column key={post._id}>
                            <PostCard centered={true} post={post} nameAuth={nameAuth} user={user} />
                          </Grid.Column>
                        </Grid.Row>
                      ))}
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
          {/* <Grid.Row >
            <Grid.Column>
              <Input icon='search' placeholder='Search...' onChange={onChange} />
            </Grid.Column>
          </Grid.Row> */}
          {loading ?
            (
              <Dimmer active inverted>
                <Loader size='large' inline='centered'>Loading</Loader>
              </Dimmer>
            ) :
            (<React.Fragment>
              <Grid.Row>
                {isAuthenticated && (
                  <Grid.Column style={{ marginBottom: '1.5rem' }}>
                    <PostForm errors={errors} />
                  </Grid.Column>
                )}
                
                  {posts &&
                    itemPage(activePage).map((post) => (
                      <Grid.Column key={post._id} style={{ marginBottom: '1.5rem' }}>
                        <PostCard centered={false} post={post} nameAuth={nameAuth} user={user}/>
                      </Grid.Column>
                    ))}
                
              </Grid.Row>
             {posts.length !==0 ? <Grid.Row centered>
                <Pagination
                  activePage={activePage}
                  totalPages={totalPages}
                  firstItem={null}
                  lastItem={null}
                  nextItem={null}
                  prevItem={null}
                  onPageChange={handlePaginationChange}
                />
              </Grid.Row> : ''}
            </React.Fragment>
            )
          }
        </Grid>
      </Responsive>
    </React.Fragment>
  );

}

export default Home;