import React, { Component } from 'react';

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render () {
        return (
            <React.Fragment>
                {this.props.profiles.map((profile, i) => {
                    return (
                        <>
                            <p>Profile</p>
                            <span>Username: {profile.username.username}</span><br />
                            <span>Name: {profile.name}</span><br />
                            <span>Location: {profile.location}</span><br />
                            <span>Fave Book: {profile.favebook}</span><br />
                            <span>Wish List: {profile.wishlist}</span><br />
                        </>
                    )
                })}
            </React.Fragment>
        )
    }
}