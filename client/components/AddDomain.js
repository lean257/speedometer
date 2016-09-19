import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

class AddDomain extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    document.title = `${this.props.config.defaultTitle} | Add a new Domain`;
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.addDomain(Date.now(), this.uri.value, this.httpMethod.value);
    browserHistory.push('/');
  }
  render() {
    return (
      <form autoComplete="off" onSubmit={this.handleSubmit}>
        <h2>Add a new domain to watch</h2>
        <div className="group">
          <input type="text" placeholder="https://www.google.com/" ref={(c) => { this.uri = c; }} />
          <label htmlFor="uri">URI</label>
        </div>
        <div className="group">
          <input type="text" placeholder="GET" ref={(c) => { this.httpMethod = c; }} />
          <label htmlFor="httpMethod">HTTP Method</label>
        </div>
        <div className="group">
          <input type="submit" className="button" value="Let me Poke it!" />
        </div>
      </form>
    );
  }
}

AddDomain.propTypes = {
  config: PropTypes.shape({
    defaultTitle: PropTypes.string.isRequired,
  }),
  addDomain: PropTypes.func,
};

export default AddDomain;
