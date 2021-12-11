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
                    <button onClick={this.props.profileButton}>Profiles</button>
                    <button onClick={this.props.forumButton}>Book Forum</button>
                <hr />
            </React.Fragment>
        )
    }
}