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
            {/* <img id='forumpic' alt='forumpic' src='https://i.imgur.com/z4yVvjl.png' /> */}
           {this.props.posts.map((post, i) => {
                return (
                <>
                <hr id='postlines' />
                    <ul key={i}>
                        <li key={post.id + '_title'} id='title'>Title: {post.title}</li><br />
                        <li key={post.id + '_post'} id='post'>Post: {post.post}</li><br />
                        <li key={post.id + '_author'} id='author'>Name: {post.author.username}</li><br />
                    </ul> 
                    {
                        post.author.id === this.props.currentUserId && 
                        <button onClick={() => this.props.showEditForm(post)}><img width='18px' alt='edit button' src='https://i.imgur.com/Wie5RHb.png' /></button> 
                    }
                    {
                        post.author.id === this.props.currentUserId && 
                        <button type='submit' onClick={() => this.props.delete(post.id)}><img width='18px' alt='delete button' src='https://i.imgur.com/1uWeVvr.png' /></button> 
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
                    <button onClick={() => this.props.comment} className='bg-gray-500 text-white font-bold py-1 px-1 rounded-full'>Add Comment</button>
                    <br/ ><strong><u>Comments</u></strong>
                    {
                        this.props.comments.map((comment, i) => {
                            if (post.id === comment.postid.id){
                                return (
                                <>
                                <li>{comment.comment}</li>
                                {
                                    comment.author.id === this.props.currentUserId && 
                                    <button onClick={() => this.props.commentEdit(comment)}><img width='13px' alt='edit button' src='https://i.imgur.com/Wie5RHb.png' /></button>
                                }
                                {
                                    comment.author.id === this.props.currentUserId && 
                                    <button type='submit' onClick={() => this.props.deleteComment(comment.id)}><img width='13px' alt='delete button' src='https://i.imgur.com/1uWeVvr.png' /></button> 
                                }
                                {   this.props.commentModal &&  
                                    <div id='modalbg'>
                                        <div id='modalmain'>
                                            <form onSubmit={this.props.submitCommentEdit}>
                                                <label>Comment: </label>
                                                <input 
                                                    name='comment'
                                                    defaultValue={this.props.commentToBeEdited.comment}
                                                    onChange={this.props.handleChange}  
                                                /><br />
                                                <button className='bg-gray-500 text-white font-bold py-1 px-1 rounded-full'>Update</button>
                                            </form> 
                                        </div>
                                    </div> 
                                }
                                </>
                                )
                            } else {
                                return (
                                    <p></p>
                                )
                            }
                        })
                    }
                </>    
                    ) 
                })
           }
        </React.Fragment>
        )
    }
}
