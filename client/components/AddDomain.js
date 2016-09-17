import React from 'react';
import { browserHistory } from 'react-router';

let AddDomain = React.createClass({
  componentDidMount() {
    document.title = `${this.props.config.defaultTitle} | Add a new Domain`;
  },
  _handleSubmit(event) {
    event.preventDefault();
    let {uri, httpMethod} = this.refs;
    this.props.addDomain(Date.now(), uri.value, httpMethod.value);
    browserHistory.push('/');
  },
  render() {
    return (
      <form autoComplete="off" onSubmit={this._handleSubmit}>
        <h2>Add a new domain to watch</h2>
        <div className="group">
          <input type="text" placeholder="https://www.google.com/" ref="uri"/>
          <label htmlFor="uri">URI</label>
        </div>
        <div className="group">
          <input type="text" placeholder="GET" ref="httpMethod"/>
          <label htmlFor="httpMethod">HTTP Method</label>
        </div>
        <div className="group">
          <input type="submit" className="button" value="Let me Poke it!" />
        </div>
      </form>
    );
  }
});

export default AddDomain;
