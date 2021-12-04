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
           {this.props.posts.map((post, i) => {
                return (
                <>
                    <li key={i}>
                        <span>Title: {post.title}</span><br />
                        <span>Post: {post.post}</span><br />
                        <span>Name: {post.name.username}</span><br />
                    </li> 
                    <button>Comment</button>
                    {
                        post.name.id === this.props.currentUserId && 
                        <button onClick={() => this.props.showEditForm(post)}>Edit</button> 
                    }
                    {
                        post.name.id === this.props.currentUserId && 
                        <button onClick={() => this.props.delete(post.id)}>Delete</button> 
                    }
                    {   this.props.modal &&  
                        <div id='modalbg'>
                            <div id='modalmain'>
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
                                    <button className='bg-gray-500 text-white font-bold py-1 px-1 rounded-full'>Update</button>
                                </form> 
                            </div>
                        </div> 
                    }
                </>    
                    ) 
                })
           }
        </React.Fragment>
        )
    }
}