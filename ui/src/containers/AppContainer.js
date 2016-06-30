import React, { Component } from 'react';

import App from '../components/App';

export default class AppContainer extends Component {
  componentWillMount() {
    this.setState({ loading: true });
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const dataRequest = new Promise((resolve) => {
      setTimeout(() => resolve({ example: 'OK' }), 1000);
    });
    dataRequest.then(data => {
      this.setState({ ...data, loading: false });
    });
  }

  render() {
    return (
      <App {...this.state} />
    );
  }
}
