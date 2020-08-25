import React, { Component } from 'react';

import { Header, Form, Segment } from 'semantic-ui-react';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      error: null,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(e) {
    // const { password } = this.state;
    const resp = await (await fetch(
      'http://ec2-52-53-200-7.us-west-1.compute.amazonaws.com:3001/api/ip'
    )).json();
    console.log(resp);
    console.log(this.props);
    if (resp.success) {
      this.setState({ error: null, ip: resp.ip });
      // window.location = '/admin/';
    } else {
      this.setState({ error: 'Wrong password' });
    }
  }

  render() {
    return (
      <Segment>
        <Form onSubmit={this.onSubmit}>
          <Header>Admin Login</Header>
          <Form.Input
            onChange={(e, { value }) => this.setState({ password: value })}
            type="password"
            label="Password"
          />
          <Form.Button>获取IP</Form.Button>
          <div>{this.state.ip ? this.state.ip : ''}</div>
          <p style={{ color: 'red' }}>{this.state.error}</p>
        </Form>
      </Segment>
    );
  }
}
