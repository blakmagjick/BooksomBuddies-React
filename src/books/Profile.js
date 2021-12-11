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
            <p className='text-2xl font-semibold'>Profiles</p>
                {this.props.profiles.map((profile, i) => {
                    return (
                        <>
                        <div className='profiles'>
                            <span>Username: {profile.username.username}</span><br />
                            <span>Name: {profile.name}</span><br />
                            <span>Location: {profile.location}</span><br />
                            <span>Fave Book: {profile.favebook}</span><br />
                            <span>Wish List: {profile.wishlist}</span><br />
                        </div>
                        </>
                    )
                })}
            </React.Fragment>
        )
    }
}