import React, {Component} from 'react';
import {Link} from "react-router-dom";


class Protected extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            loggedIn: false
        };
    }

	componentDidMount()
	{
      	fetch('/api/checkToken')
        .then(res =>
		{
          	if (res.status === 200)
			{
        		this.setState({ loggedIn: true });
      		}
			else
			{

          	}
        })
        .catch(err =>
		{
          	this.setState({ loggedIn: false });
        });
    }

    render()
    {
		const { loggedIn } = this.state;

        return (
            <>
                {
					loggedIn === true &&
					this.props.children
				}
            </>
        );
    }
}

export default Protected;