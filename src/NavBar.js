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
                    <button className='bg-gray-500 text-white font-bold py-1 px-1 rounded-full' onClick={this.props.profileButton}>Profiles</button>
                    <button className='bg-gray-500 text-white font-bold py-1 px-1 rounded-full' onClick={this.props.forumButton}>Book Forum</button>
                <hr />
            </React.Fragment>
        )
    }
}