import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import { createStore } from 'redux';
import { Provider } from 'react-redux'; //Provider makes the store accessible to any component that might want to use it.
import { devToolsEnhancer } from "redux-devtools-extension";
import moviesApp from './reducers/reducers';

import MainView from './components/main-view/main-view';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}> {/*inside the Provider we will pass every component that will want to have access to that store you wrap each componenet inside the Provider*/}
        <Container id="main-view">
          <MainView />
        </Container>
      </Provider>
    );
  }
}
// Finds the root of app
const container = document.getElementsByClassName('app-container')[0];
// Tells React to render app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);