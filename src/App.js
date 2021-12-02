import React, { Component } from 'react';
import './App.css';
import Register from './users/Register'
import RegisterButton from './users/RegisterButton';
import Login from './users/Login'
import LoginButton from './users/LoginButton'
import Logout from './users/Logout'

import Books from './books/Books'

import MainPost from './forum/MainPost'

export default class App extends Component {
  constructor(){
    super()
    this.state ={
      baseURL: 'http://localhost:8000',
      modalOpen: false, 
      userLoggedIn: false,
      loggedButton: false,
      currentUserId: null,
      email: '',
      username: '',
      password: '',
      users: [],
      posts: [],
      title: '',
      post: '',
      books: false,
      regButton: false,
      postToBeEdited: null
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
      console.log(data)
      this.setState({
        users: data.data
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

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = async (event) => {
    console.log(this.state.postToBeEdited.name.username)
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
      console.log(response)
      return response.json()
    })
    .then (data => {
      console.log(data)
      this.addUser(data)
      this.setState({
        email: '',
        password: '',
        userLoggedIn: true
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
          console.log('✨ Login successful! 🎉', data)
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

  showEditForm = (post) => {
    this.setState({
      modalOpen: true,
      postToBeEdited: post
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
      // console.log(data)
      this.setState({
        posts: data.data
      })
    })
  }

  checkLoggedIn = () => {
    fetch(this.state.baseURL + '/users/who_is_logged_in', {
      credentials: 'include'
    })
    .then (response => {
      if (response.status === 200) {
        this.setState({
          userLoggedIn: true
        })
        this.getPosts()
        console.log('A user is currently logged in')
        return response.json()
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
    // console.log(this.state.postToBeEdited)
    // console.log(this.state.currentUserId)
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
        {this.state.posts && <MainPost posts={this.state.posts} showEditForm={this.showEditForm} modal={this.state.modalOpen} handleChange={this.handleChange} postToBeEdited={this.state.postToBeEdited} handleSubmit={this.handleSubmit} username={this.state.username} currentUserId={this.state.currentUserId}/>}
      </>
    )
  }
}
