import React, { Component } from 'react';

export default class MainPost extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render () {
        return (
            <React.Fragment>
                <h1 className='text-2xl font-semibold'>Welcome to the Book Forum</h1>
                <table>
                    <tbody>
                        {this.props.posts.map((post, i) => {
                                return (
                                    <tr key={i}>
                                        <td>Title: {post.title} <br />
                                        Post: {post.post} <br />
                                        Name: {post.name.username} <br />
                                        </td> 
                                        <td onClick={() => this.props.showEditForm(post)}>✎</td>
                                        {/* <td onClick={() => this.props.deletePost(post.id)}>x</td>  */}
                                    </tr>
                                )
                            }
                        )}
                    </tbody>
                </table>
            </React.Fragment>
        )
    }
}