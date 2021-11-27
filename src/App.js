import React, { Component } from 'react';
import './App.css';
import Register from './users/Register'
import RegisterButton from './users/RegisterButton';
import Login from './users/Login'
import LoginButton from './users/LoginButton'
import Logout from './users/Logout'

export default class App extends Component {
  constructor(){
    super()
    this.state ={
      baseURL: 'http://localhost:8000',
      userLoggedIn: false,
      loggedButton: false,
      email: '',
      username: '',
      password: '',
      users: [],
      buttonId: false
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
        username: '',
        password: ''
      })
      document.getElementById('regform').reset()
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
    console.log(loginDeets) // Testing

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
        response.json().then(
          body => console.log('✨ Login successful! 🎉', body))
        this.setState({
          username: '',
          password: '',
          userLoggedIn: true
        })
        document.getElementById('loginform').reset()
      }
    }
    catch (error) {
      console.log('Error =>', error)
    }
  }

  logoutUser = () => {
    this.setState({
      userLoggedIn: false,
      buttonId: false
    })
    window.location='/'
  }

  setButton1 = () => {
    this.setState({
      buttonId: true
    })
  }

  setButton2 = () => {
    this.setState({
      loggedButton: true
    })
  }

  render(){
    return (
      <>
        <h1>Booksom Buddies</h1>
        <RegisterButton setButton={this.setButton1} button={this.state.buttonId} loggedIn={this.state.userLoggedIn}/>
        <Register buttonId={this.state.buttonId} loggedIn={this.state.userLoggedIn} change={this.handleChange} register={this.handleRegister} />
        <LoginButton button={this.state.loggedButton} setButton={this.setButton2} />
        <Login login={this.loginUser} change={this.handleChange} loggedIn={this.state.userLoggedIn} button={this.state.loggedButton} />
        <Logout logout={this.logoutUser} loggedIn={this.state.userLoggedIn} buttonId={this.state.buttonId} />
      </>
    )
  }
}
