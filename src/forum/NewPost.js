import React from 'react';

export default function NewPost (props) {
    const loggedIn = props.userLoggedIn
    if (loggedIn)
    return(
        <React.Fragment>
            <h1 className='text-xl font-semibold'>Create New Post</h1>
            <form id='newpostform' onSubmit={props.handleSubmit}>
                <label>Title: </label>
                <input 
                    type='text'
                    id='title'
                    name='title'
                    onChange={(event) => props.handleChange(event)}
                /><br />
                <label>Post: </label>
                <input 
                    type='text'
                    id='post'
                    name='post'
                    onChange={(event) => props.handleChange(event)}
                /><br /><br />
                <input className='bg-gray-500 text-white font-bold py-1 px-1 rounded-full' type='submit' value='Add Post' />
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
