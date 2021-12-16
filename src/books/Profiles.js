import React from 'react';

export default function Profile (props) {
    return (
        <React.Fragment>
        <h4>Profiles</h4>
            {props.profiles.map((profile, i) => {
                return (
                    <>
                    <div id={i} className='profiles'>
                        <img src={profile.profilepic} alt='user' width='150px'/><br />
                        <span>Username: {profile.username.username}</span><br />
                        <span>Name: {profile.name}</span><br />
                        <span>Location: {profile.location}</span><br />
                        <span>Fave Book:<br /> <img src={profile.favebook} alt='favebookcover' /></span><br />
                    </div>
                    {
                        profile.username.id === props.currentUserId  &&
                        <button className='border border-secondary btn btn-secondary-outline btn-sm' onClick={() => props.profileEdit(profile)}><img width='13px' alt='edit button' src='https://i.imgur.com/Wie5RHb.png' /></button>
                    }
                    {
                        profile.username.id === props.currentUserId &&
                        <button className='border border-secondary btn btn-secondary-outline btn-sm' type='submit' onClick={() => props.deleteProfile(profile.id)}><img width='13px' alt='delete button' src='https://i.imgur.com/1uWeVvr.png' /></button>
                    }
                    {   
                        props.profileModal &&  
                        <div id='modalbg'>
                            <div id='modalmainprofile'>
                                <form id='newpostform profileform' onSubmit={props.submitProfileEdit}>
                                    <label id='newformdiv2'>Name: </label>
                                    <input 
                                        name='name'
                                        id='profilename'
                                        defaultValue={props.profileToBeEdited.name}
                                        onChange={props.handleChange}  
                                    /><br />
                                    <label id='newformdiv'>Profile Pic: </label>
                                    <input 
                                        name='profilepic'
                                        id='profilepic'
                                        defaultValue={props.profileToBeEdited.profilepic}
                                        onChange={props.handleChange}  
                                    /><br />
                                    <label id='newformdiv'>Location: </label>
                                    <input 
                                        name='location'
                                        id='profilelocation'
                                        defaultValue={props.profileToBeEdited.location}
                                        onChange={props.handleChange}  
                                    /><br />
                                    <label id='newformdiv'>Fave Book: </label>
                                    <input 
                                        name='favebook'
                                        id='profilefavebook'
                                        defaultValue={props.profileToBeEdited.favebook}
                                        onChange={props.handleChange}  
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