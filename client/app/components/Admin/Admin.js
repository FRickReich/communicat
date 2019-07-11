'use strict';

import React, { Component } from 'react';

class Admin extends Component
{
    constructor(props)
    {
        super(props);

        this.state =
        {
            counters: []
        };
    }
  
    render()
    {
        return (
            <div>AdminPanel</div>
        );
    }
}

export default Admin;
