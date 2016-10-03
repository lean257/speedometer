import React, { PropTypes } from 'react';
import { Line as LineChart } from 'rc-chartjs';

const formatChartLabel = label => label.replace(/(\d{2}:\d{2}:\d{2})/, '$1');

const generateChartLabels = (metric) => {
  const d = new Date(metric.time);
  const label = formatChartLabel(`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`);
  return label;
};

const generateChartValues = metric => metric.value;

class Dashboard extends React.Component {
  componentDidMount() {
    document.title = `${this.props.config.defaultTitle} | Dashboard`;
    this.props.fetchDomains();
  }

  render() {
    const options = this.props.config.defaultChartOptions;
    const domains = this.props.domains.map((domain) => {
      const metrics = domain.metrics.reverse();
      const chartData = {
        labels: metrics.map(generateChartLabels),
        datasets: [{ data: metrics.map(generateChartValues) }],
      };
      const lineChart = (<LineChart data={chartData} options={options} />);
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
    metrics: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.number,
      time: PropTypes.string,
    })),
  })),
  fetchDomains: PropTypes.func,
};

export default Dashboard;
