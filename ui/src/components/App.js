import React, { Component, PropTypes } from 'react';

import '../../vendor/bootstrap/css/bootstrap.min.css';
import '../../vendor/bootstrap/css/bootstrap-theme.min.css';

export default class App extends Component {
  static get propTypes() {
    return {
      example: PropTypes.string,
      loading: PropTypes.bool.isRequired,
    };
  }

  loadingMessage() {
    if (this.props.loading) {
      return <p>Loading...</p>;
    }
    return <p>Loaded!</p>;
  }

  render() {
    return (
      <div>
        <h1>Hello World!</h1>
        {this.loadingMessage()}
        <p>Example Value: {this.props.example}</p>
      </div>
    );
  }
}
