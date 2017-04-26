import React, { Component } from 'react';
import {Button} from 'react-bootstrap'
import axios from 'axios';
import './APITest.css';

export default class APITest extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      pingData: "",
      timeSheetData: "",
      employeesData: ""
    };

    this.doEmployeesRequest = this.doEmployeesRequest.bind(this);
    this.doPingRequest = this.doPingRequest.bind(this);
    this.doTimeSheetRequest = this.doTimeSheetRequest.bind(this);
  }

  doPingRequest() {
    axios.get("http://localhost:3636/api/ping").then((res) => {
      let data = JSON.stringify(res.data);
      let state = {...this.state, ...{pingData: data }};
      this.setState(state);
    }, (err) => {
      this.setState({...this.state, ...{pingData: err.message }});
    });
  }

  doTimeSheetRequest() {
    var token = this.props.auth.getAccessToken();
    axios.get("http://localhost:3636/api/timesheets", {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    }).then((res) => {
      let data = JSON.stringify(res.data);
      let state = {...this.state, ...{timeSheetData: data }};
      this.setState(state);
    }, (err) => {
      this.setState({...this.state, ...{timeSheetData: err.message }});
    });
  }

  doEmployeesRequest() {
    var token = this.props.auth.getAccessToken();
    axios.get("http://localhost:3636/api/employees", {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    }).then((res) => {
      let data = JSON.stringify(res.data);
      let state = {...this.state, ...{employeesData: data }};
      this.setState(state);
    }, (err) => {
      this.setState({...this.state, ...{employeesData: err.message }});
    });
  }

  beautify(str) {
    try {
      var json = JSON.parse(str);
      return JSON.stringify(json, null, 2);
    } catch (e) {
      // Could not beautify output
    }
    return str;
  }

  render() {
    return (
      <div className='api-test-container'>
        <h1>API test page</h1>
        <h3>Ping request</h3>
        <p className='description'>This will test that your API is accessible. No authentication required.</p>
        <div>
          <Button onClick={this.doPingRequest}>Test</Button>
        </div>
        { this.state.pingData ? (
        <div>
          <h4>Response</h4>
          <div className='data'>
            <pre className='code'>{this.state.pingData}</pre>
          </div>
        </div>
        ) : ''}
        <h3>Timesheet request</h3>
        <p className='description'>This will retrieve timesheet data. Both Employees and Managers can invoke this endpoint.</p>
        <div>
          <Button onClick={this.doTimeSheetRequest}>Test</Button>
        </div>
        { this.state.timeSheetData ? (
        <div>
          <h4>Response</h4>
          <div className='data'>
            <pre className='code'>
              {this.beautify(this.state.timeSheetData)}</pre>
          </div>
        </div>
        ) : ''}
        <h3>Employees request</h3>
        <p className='description'>This will retrieve employees data. Only Managers can invoke this endpoint.</p>
        <div>
          <Button onClick={this.doEmployeesRequest}>Test</Button>
        </div>
        { this.state.employeesData ? (
        <div>
          <h4>Response</h4>
          <div className='data'>
            <pre className='code'>
              {this.beautify(this.state.employeesData)}
            </pre>
          </div>
        </div>
        ) : ''}
      </div>
    );
  }
}
