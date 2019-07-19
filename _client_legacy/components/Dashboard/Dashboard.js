import React, { Component } from 'react';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'Loading...'
    };
  }

  componentDidMount() {
    //GET message from server using fetch api
    fetch('/api/dashboard')
      .then(res => res.text())
      .then(res => this.setState({message: res}));
  }

  render() {
    return (
      <>
        <h1>Home</h1>
        <p>{this.state.message}</p>
      </>
    );
  }
}

export default Dashboard;
