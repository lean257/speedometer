import React, { PropTypes } from 'react';

const Notifications = React.createClass({  // eslint-disable-line
  propTypes: {
    config: PropTypes.shape({
      defaultTitle: PropTypes.string.isRequired,
    }),
  },
  componentDidMount() {
    document.title = `${this.props.config.defaultTitle} | Notifications`;
  },
  render() {
    return (<h1>Notifications</h1>);
  },
});

export default Notifications;
