import React from 'react';

export default function About (props) {
    const loggedIn = props.userLoggedIn
    if (loggedIn === false)
    return (
        <React.Fragment>
            <h2> Welcome to Booksom Buddies!</h2>
            <h5>A place to come and find your new favourite book 📚</h5>
            <table>
                <tr>
                    <th>Are you looking to find new books to read?</th>
                    <td>Check out the book forum, to discuss books with other users. Post questions, or comment on other user's posts.</td>
                </tr>
                <tr>
                    <th>Are you looking for other people with the same taste in books as you?</th>
                    <td>Browse user profiles to find other users who have the same fave book as you.</td>
                </tr>
            </table>
            <br />
            <p>Register above to continue.</p>
        </React.Fragment>
    )
    else
    return ('')
}