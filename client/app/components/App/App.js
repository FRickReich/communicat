import React, {Component} from 'react';
import 'regenerator-runtime/runtime'

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
                { this.props.children }
            </>
        );
    }
}

export default App;