import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

class AddDomain extends React.Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    document.title = `${this.props.config.defaultTitle} | Add a new Domain`;
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.addDomain(Date.now(), this.state.uri, 'GET');
    browserHistory.push('/');
  }
  onChange(event) {
    event.preventDefault();
    this.setState({ uri: event.target.value });
  }
  render() {
    return (
      <form autoComplete="off" onSubmit={this.onSubmit}>
        <h2 className="caption text-center">Add a new domain</h2>
        <div className="group">
          <input type="text" placeholder="https://www.google.com/" onChange={this.onChange} />
          <label htmlFor="uri">URI</label>
        </div>
        <div className="group">
          <input type="submit" className="button" value="Monitor Now" />
        </div>
      </form>
    );
  }
}

export default AddDomain;
