import React, { Component } from 'react';

export default class AddBook extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render () {
        return (
        <>
            <form onSubmit={this.props.getBooks}>
                <label htmlFor='bookSearched'>Book Title: </label>
                <input
                    type='text'
                    id='bookSearched'
                    name='bookSearched'
                    onChange={(event) => this.props.handleChange(event)}
                />
                <button className='btn btn-secondary btn-sm' type='submit'>Search Open Library</button>
            </form>
        </>
        )
    }
}