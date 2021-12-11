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
            {/* <h2>Welcome to the Book Forum</h2> */}
           {this.props.posts.map((post, i) => {
                return (
                <>
                {/* <hr id='postlines' /> */}
                    <div key={i}>
                        <h4 key={post.id + '_title'} id='title'>{post.title}</h4><br />
                        <p key={post.id + '_post'} id='post'>{post.post}</p><br />
                        <p key={post.id + '_author'} id='author'>Posted by: {post.author.username} on {post.date}</p><br />
                    </div>
                    {
                        post.author.id === this.props.currentUserId && 
                        <button className='border border-secondary btn btn-secondary-outline btn-sm' onClick={() => this.props.showEditForm(post)}><img width='15px' alt='edit button' src='https://i.imgur.com/Wie5RHb.png' /></button> 
                    }
                    {
                        post.author.id === this.props.currentUserId && 
                        <button type='submit' className='border border-secondary btn btn-secondary-outline btn-sm' onClick={() => this.props.delete(post.id)}><img width='15px' alt='delete button' src='https://i.imgur.com/1uWeVvr.png' /></button> 
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
                                    <button className='btn btn-secondary btn-sm'>Update</button>
                                </form> 
                            </div>
                        </div> 
                    }
                    {
                        <h6><strong><i>Comments</i></strong></h6>
                    }
                    {
                        this.props.comments.map((comment, i) => {
                            if (post.id === comment.postid.id){
                                return (
                                <>
                                <li key={i} id='comments'>
                                    {comment.comment}<br />
                                    <span id='author'>Post by: {comment.author.username} on {comment.date}</span>
                                {
                                    comment.author.id === this.props.currentUserId && 
                                    <button className='border border-secondary btn btn-secondary-outline btn-sm' onClick={() => this.props.commentEdit(comment)}><img width='13px' alt='edit button' src='https://i.imgur.com/Wie5RHb.png' /></button>
                                }
                                {
                                    (comment.author.id === this.props.currentUserId || post.author.id === this.props.currentUserId) && 
                                    <button className='border border-secondary btn btn-secondary-outline btn-sm' type='submit' onClick={() => this.props.deleteComment(comment.id)}><img width='13px' alt='delete button' src='https://i.imgur.com/1uWeVvr.png' /></button> 
                                }
                                {   this.props.commentModal &&  
                                    <div id='modalbg'>
                                        <div id='modalmain'>
                                            <form onSubmit={this.props.submitCommentEdit}>
                                                <label>Comment: </label>
                                                <input 
                                                    name='comment'
                                                    onChange={this.props.handleChange}  
                                                /><br />
                                                <button className='btn btn-secondary btn-sm'>Update</button>
                                            </form> 
                                        </div>
                                    </div> 
                                }</li>
                                </>
                                )
                            } else {
                                return (
                                    ''
                                )
                            }
                        })
                    }
                    {
                        <><br />
                            <button className='btn btn-secondary btn-sm' type='submit' onClick={(event) => this.props.showNewCommentForm(post.id)}>Add Comment</button> 
                        </>
                    }
                    {   (this.props.newCommentModal &&  post.id === this.props.postToAddComment) &&
                        <div id='modalbg'>
                            <div id='modalmain'>
                                <form onSubmit={(event) => {this.props.handleSubmitNewComment(event, post.id)}}>
                                    <label>Comment: </label>
                                    <input 
                                        name='comment'
                                        onChange={this.props.handleChange}    
                                    />
                                    <button className='btn btn-secondary btn-sm'>Add Comment</button>
                                </form> 
                            </div>
                        </div> 
                    }
                    {
                        <hr id='postlines' />
                    }

                </>    
                    ) 
                })
           }
        </React.Fragment>
        )
    }
}
