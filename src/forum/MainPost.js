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
                <br />
                {
                this.props.modal &&
                <form onSubmit={this.props.handleSubmit}>
                    <label>Title: </label>
                    <input 
                        name='title'
                        defaultValue={this.props.postToBeEdited.title}
                        onChange={this.props.handleChange}    
                    />
                    <label>Post: </label>
                    <input 
                        name='post'
                        defaultValue={this.props.postToBeEdited.post}
                        onChange={this.props.handleChange}  
                    /><br />
                    <button>Update Post</button>
                </form>
                }
            </React.Fragment>
        )
    }
}