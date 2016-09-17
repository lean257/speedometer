import React from 'react';

let Dashboard = React.createClass({
  componentDidMount() {
    document.title = `${this.props.config.defaultTitle} | Dashboard`;
  },
  render() {
    const domains = this.props.domains.map((domain) => {
      return (
        <h1 key={domain.id}>{domain.httpMethod} {domain.uri}</h1>
      );
    });
    return(
      <div>
        {domains}
      </div>
    );
  }
});

export default Dashboard;
