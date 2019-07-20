import React, {Component} from 'react';
import 'regenerator-runtime/runtime'

import NavBar from "./../NavBar/NavBar"

class App extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {

        };
    }

    render()
    {
        return (
            <>
                <NavBar />
                { this.props.children }
            </>
        );
    }
}

export default App;