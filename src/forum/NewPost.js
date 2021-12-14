import React from 'react';

export default function NewPost (props) {
    const loggedIn = props.userLoggedIn
    if (loggedIn)
    return(
        <React.Fragment>
            <h2>Create New Post</h2>
            <div id='newformdiv2'>
            <form id='newpostform' onSubmit={props.handleSubmit}>
                <label id='newformdiv2'>Title: </label>
                <input 
                    type='text'
                    id='formtitle'
                    name='title'
                    onChange={(event) => props.handleChange(event)}
                /><br />
                <label id='newformdiv2'>Post: </label>
                <input 
                    type='text'
                    id='formpost'
                    name='post'
                    onChange={(event) => props.handleChange(event)}
                /><br /><br />
                <input className='btn btn-secondary btn-sm' type='submit' value='Add Post' />
            </form>
            </div>
        </React.Fragment>
    )
    else
    return (
        <React.Fragment>
            <hr />
            <h4>Login to make a new post.</h4>
        </React.Fragment>
    )
}
