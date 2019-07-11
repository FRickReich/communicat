'use strict';

import React, { Component } from 'react';

class Blog extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            posts: []
        };
    }

    componentDidMount()
    {
        this.GetAllBlogPosts();
    }

    GetAllBlogPosts()
    {
        fetch('/api/blog/all')
        .then(res => res.json())
        .then(json => {
        
            this.setState({
                posts: json
            });
        });
    }

    AddnewBlogPost()
    {
        const body = { name: 1 };

        fetch('/api/blog/new', { 
            method: 'POST', 
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json())
        .then(json => {
            let data = this.state.posts;
            
            data.push(json);

            this.setState({
                posts: data
            });
      });
    }
  
    render() {
        const { posts } = this.state;

        return (
            <div>
                <div>
                { posts.map((post, i) => (
                    <li key={i}>
                        <span>{post._id} </span>
                    </li>
                )) }
                </div>
                <button onClick={() => this.AddnewBlogPost()}>Add new</button>
            </div>
        );
    }
}

export default Blog;
