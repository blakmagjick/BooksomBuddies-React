import React from 'react';

export default function NewPost (props) {
    const loggedIn = props.userLoggedIn
    if (loggedIn)
    return(
        <React.Fragment>
            <form onSubmit={props.handleSubmit}>
                <label>Title: </label>
                <input 
                    type='text'
                    id='title'
                    name='title'
                    onChange={(event) => props.handleChange(event)}
                />
                <label>Post: </label>
                <input 
                    type='text'
                    id='post'
                    name='post'
                    onChange={(event) => props.handleChange(event)}
                /><br />
                <input type='submit' value='Add Post' />
            </form>
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
