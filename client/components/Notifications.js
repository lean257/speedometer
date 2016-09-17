import React from 'react';

let Notifications = React.createClass({
  componentDidMount() {
    document.title = `${this.props.config.defaultTitle} | Notifications`;
  },
  render() {
    return (
      <h1>Notifications</h1>
    );
  }
});
export default Notifications;
