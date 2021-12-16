import React from 'react';

export default function BookCoverList (props) {
    if (props.bookInfo) 
    return (
        <React.Fragment>
        <p>Pick your favourite cover art: </p>
        {props.bookInfo.map(cover => {
            return (
                <img id={cover.isbn} onClick={(event) => props.bookClick(event)} className='coverart' alt='coverart' height='200px' src={cover.cover} />
                )
            })
        }

        </React.Fragment>
    )
    else 
    return (
        ''
    )
}