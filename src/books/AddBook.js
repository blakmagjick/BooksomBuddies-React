import React from 'react';
import BookCoverList from '../books/BookCoverList'


export default function AddBook (props) {
    return (
    <div id='newformdiv'>
        <form onSubmit={props.getBooks}>
            <label htmlFor='bookSearched'>Fave Book: </label>
            <input
                type='text'
                id='bookSearched'
                name='bookSearched'
                onChange={(event) => props.handleChange(event)}
            />
            <button className='btn btn-secondary btn-sm' type='submit'>Search Open Library</button>
        </form>
        <BookCoverList 
            bookInfo={props.bookInfo}
            bookClick={props.bookClick}
        />
    </div>
    )
}