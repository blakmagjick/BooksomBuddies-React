import React, { Component } from 'react';
import './App.css';
import Register from './users/Register'
import RegisterButton from './users/RegisterButton';
import Login from './users/Login'
import LoginButton from './users/LoginButton'
import Logout from './users/Logout'

import Books from './books/Books'

import MainPost from './forum/MainPost'
import NewPost from './forum/NewPost'

export default class App extends Component {
  constructor(){
    super()
    this.state ={
      baseURL: 'http://localhost:8000',
      modalOpen: false, 
      commentModelOpen: false,
      userLoggedIn: false,
      loggedButton: false,
      commentButton: false,
      currentUserId: null,
      email: '',
      username: '',
      password: '',
      users: [],
      posts: [],
      comments: [],
      title: '',
      post: '',
      books: false,
      regButton: false,
      postToBeEdited: null,
      commentToBeEditd: null
    }
  }

  getUsers = () => {
    fetch(this.state.baseURL + '/users', {
      credentials: 'include'
    })
    .then (response => {
      if (response.status === 200) {
        return response.json()
      } else {
        return []
      }  
    })
    .then(data => {
      // console.log(data)
      this.setState({
        users: data.data
      })
    })
  }

  getPosts = () => {
    fetch(this.state.baseURL + '/posts/', {
      credentials: 'include'
    })
    .then (response => {
      // console.log(response)
      if (response.status === 200) {
        return response.json()
      } else {
        return []
      }  
    })
    .then(data => {
      console.log(data.data)
      this.setState({
        posts: data.data
      })
    })
  }

  getComments = () => {
    fetch(this.state.baseURL + '/posts/comments/', {
      credentials: 'include'
    })
    .then (response => {
      // console.log(response)
      if (response.status === 200) {
        return response.json()
      } else {
        return []
      }
    })
    .then (data => {
      console.log(data.data)
        this.setState({
          comments: data.data
        })
    })
  }

  addUser = (newUser) => {
    const copyUsers = [...this.state.users]
    copyUsers.push(newUser)
    this.setState({
      users: copyUsers
    })
  }

  addPost = (newPost) => {
    const copyPosts = [...this.state.posts]
    copyPosts.push(newPost)
    this.setState({
      posts: copyPosts
    })
  }

  deletePost = (id) => {
    fetch(this.state.baseURL + '/posts/' + id, {
      method: 'DELETE'
    })
    .then (response => {
      const findIndex = this.state.posts.findIndex(post => post.id === id)
      const copyPosts = [...this.state.posts]
      copyPosts.splice(findIndex, 1)
      this.setState({
        posts: copyPosts
      })
    })
  }

  deleteComment = (id) => {
    fetch(this.state.baseURL + '/posts/comments/' + id, {
      method: 'DELETE'
    })
    .then (response => {
      const findIndex = this.state.comments.findIndex(comment => comment.id === id)
      const copyComments = [...this.state.comments]
      copyComments.splice(findIndex, 1)
      this.setState({
        comments: copyComments
      })
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = async (event) => {
    // console.log(this.state.postToBeEdited.name.username)
    event.preventDefault()
    const URL = this.state.baseURL + '/posts/' + this.state.postToBeEdited.id
    try {const response = await fetch(URL, {
      method: 'PUT',
      body: JSON.stringify({
        title: event.target.title.value,
        post: event.target.post.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      if (response.status === 200){
        const updatedPost = (await response.json()).data
        // console.log(updatedPost)
        const findIndex = this.state.posts.findIndex(post => post.id === updatedPost.id)
        const copyPosts = [...this.state.posts]
        copyPosts[findIndex] = updatedPost
        this.setState({
          posts: copyPosts,
          modalOpen: false})
        }
    }
    catch(err){
      console.log('Error =>', err);
      }
  }

  handleCommentEdit = async (event) => {
    // console.log(this.state.postToBeEdited.name.username)
    event.preventDefault()
    const URL = this.state.baseURL + '/posts/comments/' + this.state.commentToBeEdited.id
    try {const response = await fetch(URL, {
      method: 'PUT',
      body: JSON.stringify({
        comment: event.target.comment.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      if (response.status === 200){
        const updatedComment = (await response.json()).data
        console.log(updatedComment)
        const findIndex = this.state.comments.findIndex(comment => comment.id === updatedComment.id)
        const copyComments = [...this.state.comments]
        copyComments[findIndex] = updatedComment
        this.setState({
          comments: copyComments,
          commentModelOpen: false})
        }
    }
    catch(err){
      console.log('Error =>', err);
      }
  }

  handleSubmitNew = async (event) => {
    event.preventDefault()
    event.target.reset()
    fetch(this.state.baseURL + '/posts/', {
        method: 'POST',
        body: JSON.stringify({
            title: this.state.title, 
            post: this.state.post
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    .then (response => {
        // console.log(response)
        return response.json()
    })
    .then (data => {
        // console.log(data)
        this.addPost(data.data)
        this.setState({
            title: '',
            post: ''
        })  
    })
    .catch (error => console.log({'Error => ': error}))
}

  handleRegister = (event) => {
    event.preventDefault()
    fetch(this.state.baseURL + '/users/register', {
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,
        username: this.state.username,
        password: this.state.password}),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    .then (response => {
      // console.log(response)
      return response.json()
    })
    .then (data => {
      // console.log(data)
      this.addUser(data)
      this.setState({
        email: '',
        password: ''
      })
    })
    .catch (
      error => console.log('Error:', error))
  }

  loginUser = async (event) => {
    event.preventDefault()
    const URL = this.state.baseURL + '/users/login'
    const loginDeets = {
      username: this.state.username,
      password: this.state.password
    }
    // console.log(loginDeets) // Testing
    try {
      const response = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify(loginDeets),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      if (response.status === 200) {
        response.json()
        .then
        (data => {
          // console.log('✨ Login successful! 🎉', data)
          console.log('✨ Login successful! 🎉')
          this.setState({
            password: '',
            userLoggedIn: true,
            loggedButton: false,
            currentUserId: data.data.id
          })
        })
        this.getPosts()
      }
    }
    catch (error) {
      console.log('Error =>', error)
    }
  }

  logoutUser = () => {
    fetch(this.state.baseURL + '/users/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    .then (response => {
      console.log('Logout successful!')
      this.setState({
        userLoggedIn: false,
        posts: [],
        modalOpen: false
      })
    })
  }

  setButton1 = () => {
    this.setState({
      regButton: true,
    })
  }

  setButton2 = () => {
    this.setState({
      loggedButton: true
    })
  }

  setButton3 = () => {
    this.setState({
      commentButton: true
    })
  }

  showEditForm = (post) => {
    // console.log('Pushed')
    this.setState({
      modalOpen: true,
      postToBeEdited: post
    })
  }

  showCommentEditForm = (comment) => {
    // console.log('Pushed')
    this.setState({
      commentModelOpen: true,
      commentToBeEdited: comment
    })
  }

  checkLoggedIn = () => {
    fetch(this.state.baseURL + '/users/who_is_logged_in', {
      credentials: 'include'
    })
    .then (response => {
      if (response.status === 200) {
        response.json()
        .then(body => {
          console.log(body.data.id)
          this.setState({
            userLoggedIn: true,
            currentUserId: body.data.id
          })
        })
        this.getPosts()
        this.getComments()
        // console.log('A user is currently logged in')
        return response
      }
      else {
        console.log('No one is currently logged in')
      }
    })
  }

  componentDidMount() {
    this.checkLoggedIn()
  }

  render(){
    return (
      <>
        {/* REGISTER/LOGIN/LOGOUT */}
        <RegisterButton setButton={this.setButton1} button={this.state.regButton} loggedIn={this.state.userLoggedIn}/>
        <Register regButton={this.state.regButton} loggedIn={this.state.userLoggedIn} change={this.handleChange} register={this.handleRegister} />
        <LoginButton button={this.state.loggedButton} setButton={this.setButton2} loggedIn={this.state.userLoggedIn}/>
        <Login login={this.loginUser} change={this.handleChange} loggedIn={this.state.userLoggedIn} button={this.state.loggedButton} />
        <Logout logout={this.logoutUser} loggedIn={this.state.userLoggedIn} regButton={this.state.regButton} />
        {/* MAIN PAGE */}
        <hr />
        {this.state.books && <Books />}
        {this.state.posts && <MainPost posts={this.state.posts} showEditForm={this.showEditForm} modal={this.state.modalOpen} handleChange={this.handleChange} postToBeEdited={this.state.postToBeEdited} handleSubmit={this.handleSubmit} username={this.state.username} currentUserId={this.state.currentUserId} delete={this.deletePost} comment={this.setButton3} comments={this.state.comments} commentEdit={this.showCommentEditForm} deleteComment={this.deleteComment} commentModal={this.state.commentModelOpen} submitCommentEdit={this.handleCommentEdit} commentToBeEdited={this.state.commentToBeEdited}/>}
        <hr />
        {this.state.userLoggedIn && <NewPost handleChange={this.handleChange} handleSubmit={this.handleSubmitNew} userLoggedIn={this.state.userLoggedIn} baseURL={this.state.baseURL}/>}
      </>
    )
  }
}
