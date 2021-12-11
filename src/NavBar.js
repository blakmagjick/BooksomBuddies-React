import React, { Component } from 'react';

export default class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state={

        }
    }

    render () {
        return (
            <React.Fragment>
                <hr />
                    <button className='btn btn-secondary btn-sm' onClick={this.props.forumButton}>Book Forum</button>
                    <button className='btn btn-secondary btn-sm' onClick={this.props.profileButton}>Profiles</button>
            </React.Fragment>
        )
    }
}