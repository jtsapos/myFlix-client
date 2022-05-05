import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container id="main-view">
        <MainView />
      </Container>
    );
  }
}
// Finds the root of app
const container = document.getElementsByClassName('app-container')[0];
// Tells React to render app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);