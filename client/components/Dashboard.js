import React, { PropTypes } from 'react';
import { Line as LineChart } from 'rc-chartjs';

class Dashboard extends React.Component {
  componentDidMount() {
    document.title = `${this.props.config.defaultTitle} | Dashboard`;
    this.props.fetchDomains();
  }

  render() {
    const options = this.props.config.defaultChartOptions;
    const domains = this.props.domains.map((domain) => {
      let lineChart = null;
      if (domain.chartData) {
        lineChart = (<LineChart data={domain.chartData} options={options} />);
      }
      return (
        <div className="col col-lg-6" key={domain.id}>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">{domain.uri}</h3>
            </div>
            <div className="panel-body">{lineChart}</div>
          </div>
        </div>
      );
    });
    return (
      <div className="row">
        {domains}
      </div>
    );
  }
}

Dashboard.propTypes = {
  config: PropTypes.shape({
    defaultTitle: PropTypes.string.isRequired,
    defaultChartOptions: PropTypes.shape(),
  }),
  domains: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    uri: PropTypes.string.isRequired,
    httpMethod: PropTypes.string.isRequired,
  })),
  fetchDomains: PropTypes.func,
};

export default Dashboard;
