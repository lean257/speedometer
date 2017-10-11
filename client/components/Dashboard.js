import React, { PropTypes } from 'react';
import { Line as LineChart } from 'rc-chartjs';
import { connect } from 'react-redux'
import { removeDomain } from '../actions/index'

const formatChartLabel = label => label.replace(/(\d{2}:\d{2}:\d{2})/, '$1');

const generateChartLabels = (metric) => {
  const d = new Date(metric.time);
  const label = formatChartLabel(`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`);
  return label;
};

const generateChartValues = metric => metric.value;

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    document.title = `Speedometer | Dashboard`;
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
              <button
              className="btn btn-default media-right"
              onClick={e => this.deleteDomain(e, domain.id)}
              value={domain.id}>
              <span className="glyphicon glyphicon-remove" />
              </button>
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
  deleteDomain(event, id) {
    this.forceUpdate()
    this.props.removeDomain(id)
  }
}

const mapState = null
const mapDispatch = {removeDomain}

export default connect(mapState, mapDispatch)(Dashboard)
