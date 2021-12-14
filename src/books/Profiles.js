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
            <h4>Profiles</h4>
                {this.props.profiles.map((profile, i) => {
                    return (
                        <>
                        <div id={i} className='profiles'>
                            <img src={profile.profilepic} alt='user' width='150px'/><br />
                            <span>Username: {profile.username.username}</span><br />
                            <span>Name: {profile.name}</span><br />
                            <span>Location: {profile.location}</span><br />
                            <span>Fave Book: {profile.favebook}</span><br />
                            <span>Wish List: {profile.wishlist}</span><br /><br />
                        </div>
                        {
                            profile.username.id === this.props.currentUserId  &&
                            <button className='border border-secondary btn btn-secondary-outline btn-sm' onClick={() => this.props.profileEdit(profile)}><img width='13px' alt='edit button' src='https://i.imgur.com/Wie5RHb.png' /></button>
                        }
                        {
                            profile.username.id === this.props.currentUserId &&
                            <button className='border border-secondary btn btn-secondary-outline btn-sm' type='submit' onClick={() => this.props.deleteProfile(profile.id)}><img width='13px' alt='delete button' src='https://i.imgur.com/1uWeVvr.png' /></button>
                        }
                        {   
                            this.props.profileModal &&  
                            <div id='modalbg'>
                                <div id='modalmain'>
                                    <form id='profileform' onSubmit={this.props.submitProfileEdit}>
                                        <label>Name: </label>
                                        <input 
                                            name='name'
                                            id='profilename'
                                            defaultValue={this.props.profileToBeEdited.name}
                                            onChange={this.props.handleChange}  
                                        /><br />
                                        <label>Profile Pic: </label>
                                        <input 
                                            name='profilepic'
                                            id='profilepic'
                                            defaultValue={this.props.profileToBeEdited.profilepic}
                                            onChange={this.props.handleChange}  
                                        /><br />
                                        <label>Location: </label>
                                        <input 
                                            name='location'
                                            id='profilelocation'
                                            defaultValue={this.props.profileToBeEdited.location}
                                            onChange={this.props.handleChange}  
                                        /><br />
                                        <label>Fave Book: </label>
                                        <input 
                                            name='favebook'
                                            id='profilefavebook'
                                            defaultValue={this.props.profileToBeEdited.favebook}
                                            onChange={this.props.handleChange}  
                                        /><br />
                                        <label>Wish List: </label>
                                        <input 
                                            name='wishlist'
                                            id='profilewishlist'
                                            defaultValue={this.props.profileToBeEdited.wishlist}
                                            onChange={this.props.handleChange}  
                                        /><br />
                                        <button className='btn btn-secondary btn-sm'>Update</button>
                                    </form> 
                                </div>
                            </div> 
                        }
                        </>
                    )
                })}
            </React.Fragment>
        )
    }
}