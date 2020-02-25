import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from './routes/routes';
import { Provider } from 'react-redux';
import store from './store/store'
import MenuBar from './components/MenuBar'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Container>
          <MenuBar/>
          <Switch>
            {showContentMenus(routes)}
          </Switch>
        </Container>
      </Router>
    </Provider>
  );
}

const showContentMenus = (routes) => {
  let result = null;
  if (routes.length > 0) {
    result = routes.map((route, index) => {
      return (
        <Route key={index}
          path={route.path}
          exact={route.exact}
          component={route.main}
        />
      )
    })
  }
  return result;
}

export default App;
