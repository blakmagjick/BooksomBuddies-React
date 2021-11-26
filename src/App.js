import React, { Component } from 'react';
import './App.css';
import Login from './users/Login'
import Logout from './users/Logout'

export default class App extends Component {
  constructor(){
    super()
    this.state ={
      baseURL: 'http://localhost:8000',
      userLoggedIn: false,
      email: '',
      username: '',
      password: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
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
      userLoggedIn: false
    })
    window.location='/'
  }

  render(){
    return (
      <>
        <h1>Booksom Buddies</h1>
        <Login login={this.loginUser} change={this.handleChange} />
        <Logout logout={this.logoutUser} loggedIn={this.state.userLoggedIn} />
      </>
    )
  }
}
