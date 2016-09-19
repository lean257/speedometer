import React, { PropTypes } from 'react';

class Dashboard extends React.Component {
  componentDidMount() {
    document.title = `${this.props.config.defaultTitle} | Dashboard`;
  }
  render() {
    const domains = this.props.domains.map(domain => (
      <h1 key={domain.id}>{domain.httpMethod} {domain.uri}</h1>
    ));
    return (
      <div>
        {domains}
      </div>
    );
  }
}

Dashboard.propTypes = {
  config: PropTypes.shape({
    defaultTitle: PropTypes.string.isRequired,
  }),
  domains: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    uri: PropTypes.string.isRequired,
    httpMethod: PropTypes.string.isRequired,
  })),
};

export default Dashboard;
