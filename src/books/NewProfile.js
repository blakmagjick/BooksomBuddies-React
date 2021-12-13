import React from 'react';

export default function NewProfile (props) {
    const loggedIn = props.userLoggedIn
    if (loggedIn)
    return(
        <React.Fragment>
            <h2>Create New Profile</h2>
            <form id='newpostform' onSubmit={props.handleProfileSubmit}>
                <label>Name: </label>
                <input 
                    type='text'
                    id='formname'
                    name='name'
                    onChange={(event) => props.handleChange(event)}
                /><br />
                <label>Location: </label>
                <input 
                    type='text'
                    id='formlocation'
                    name='location'
                    onChange={(event) => props.handleChange(event)}
                /><br />
                <label>Profile Pic: </label>
                <input 
                    type='text'
                    id='formprofilepic'
                    name='profilepic'
                    onChange={(event) => props.handleChange(event)}
                /><br />
                <label>Fave Book: </label>
                <input 
                    type='text'
                    id='formfavebook'
                    name='favebook'
                    onChange={(event) => props.handleChange(event)}
                /><br />
                <label>Wish List: </label>
                <input 
                    type='text'
                    id='formwishlist'
                    name='wishlist'
                    onChange={(event) => props.handleChange(event)}
                /><br />
                <br />
                <input className='btn btn-secondary btn-sm' type='submit' value='Add Profile' />
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