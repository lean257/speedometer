import React, { Component } from 'react';

export class Notifications extends Component {
  componentDidMount() {
    document.title = `${this.props.config.defaultTitle} | Notifications`;
  }
  render() {
    return (<h1>Notifications</h1>);
  }
}
