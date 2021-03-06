import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';

class SignupForm extends Component {
  state = {
    name: '',
    username: '',
    password: '',
    passwordConfirm: '',
    relation: ''
  };

  handleChange = e => {
    e.persist();
    this.setState({ [e.target.name]: e.target.value }, () =>
      console.log(this.state)
    );
  };

  handleSubmit = () => {
    const { name, username, password, relation } = this.state;

    fetch('http://localhost:3001/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        name: name,
        password: password,
        username: username,
        relation: relation
      })
    }) // end of fetch
      .then(r => r.json())
      .then(response => {
        if (response.errors) {
          alert(response.errors);
        } else {
          this.props.setCurrentUser(response);
          this.props.history.push('/timeline');
        }
      });
  };

  render() {
    const { name, username, password, passwordConfirm, relation } = this.state;

    return (
      <div>
        <Form onSubmit={this.handleSubmit} id='signup-form'>
          <Form.Input
            icon='user'
            iconPosition='left'
            label='Name'
            type='text'
            placeholder='Name'
            name='name'
            onChange={this.handleChange}
            value={name}
            transparent
          />
          <Form.Input
            icon='user secret'
            iconPosition='left'
            label='Username (email)'
            type='email'
            placeholder='Username'
            name='username'
            onChange={this.handleChange}
            value={username}
            transparent
          />
          <Form.Input
            icon='lock'
            iconPosition='left'
            label='Password'
            type='password'
            placeholder='Password'
            name='password'
            onChange={this.handleChange}
            value={password}
            transparent
          />
          <Form.Input
            icon='lock'
            iconPosition='left'
            label='Confirm Password'
            type='password'
            placeholder='Confirm Password'
            name='passwordConfirm'
            onChange={this.handleChange}
            value={passwordConfirm}
            transparent
          />
          <label>Relation</label>
          <select
            name='relation'
            required
            onChange={this.handleChange}
            value={relation}
          >
            <option value='' disabled selected>
              How are you related?
            </option>

            <option value='parent'>Parent</option>
            <option value='grandparent'>Grandparent</option>
            <option value='sibling'>Sibling</option>
            <option value='friend'>Friend</option>
            <option value='cousin'>Cousin</option>
            <option value='uncle'>Uncle</option>
            <option value='aunt'>Aunt</option>
          </select>

          <Button
            type='submit'
            icon='signup'
            inverted
            basic
            color='grey'
            content={
              password === passwordConfirm ? 'Sign up' : "Passwords don't match"
            }
            disabled={password === passwordConfirm && password ? false : true}
          />
        </Form>
      </div>
    );
  }
}

export default SignupForm;
