import React from 'react';

export default function NavBar (props) {
    return (
        <React.Fragment>
            <hr />
                <button className='btn btn-secondary btn-sm' onClick={props.forumButton}>Book Forum</button>
                <button className='btn btn-secondary btn-sm' onClick={props.profileButton}>Profiles</button>
        </React.Fragment>
        )
}