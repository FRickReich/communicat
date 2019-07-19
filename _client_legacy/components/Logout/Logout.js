import React, { Component } from 'react';

class Logout extends Component
{
  	constructor(props)
	{
    	super(props);

    	this.state = {};
	}

  	componentDidMount()
	{
		fetch('/api/logout',
		{
    		method: 'POST',
    		headers:
			{
      			'Content-Type': 'application/json'
    		}
  		});
  	}

  	render()
	{
    	return (
      		<>
			  <h1>Logged Out succesfully!</h1>
			</>
    	);
  	}
}

export default Logout;
