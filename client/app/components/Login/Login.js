import React, {Component} from 'react';

class Login extends Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			email: '',
			password: ''
		};
	}

	handleInputChange = (event) =>
	{
		const {value, name} = event.target;

		this.setState({
			[name]: value
		});
	}

	onLogin = (event) =>
	{
  		event.preventDefault();

		fetch('/api/authenticate',
		{
    		method: 'POST',
    		body: JSON.stringify(this.state),
    		headers:
			{
      			'Content-Type': 'application/json'
    		}
  		})
  		.then(res =>
		{
    		if (res.status === 200)
			{
				localStorage.setItem('userToken', this.state.email );
      			this.props.history.push('/');
    		}
			else
			{
      			const error = new Error(res.error);
      			throw error;
    		}
  		})
  		.catch(err =>
		{
    		console.error(err);
    		alert('Error logging in please try again');
  		});
	}

	onRegister = (event) =>
	{
		event.preventDefault();

		fetch('/api/register',
		{
    		method: 'POST',
    		body: JSON.stringify(this.state),
    		headers:
			{
      			'Content-Type': 'application/json'
    		}
  		})
  		.then(res =>
		{
    		if (res.status === 200)
			{
				localStorage.setItem('userToken', this.state.email );
      			this.props.history.push('/');
    		}
			else
			{
      			const error = new Error(res.error);
      			throw error;
    		}
  		})
  		.catch(err =>
		{
    		console.error(err);
    		alert('Error registering in please try again');
  		});
	}

	render()
	{
		return (
			<>
				<h1>Login</h1>
					<input
						type="email"
						name="email"
						placeholder="Enter email"
						value={ this.state.email }
						onChange={ this.handleInputChange }
						required
					/>
					<input
						type="password"
						name="password"
						placeholder="Enter password"
						value={ this.state.password }
						onChange={ this.handleInputChange }
						required
					/>
					<button type="submit" onClick={ this.onLogin }>Log In</button>
					<button type="submit" onClick={ this.onRegister }>Register</button>
			</>
		);
	}
}

export default Login;
