import React, { Component } from 'react';
import './App.css';
import NavBar from './NavBar'

import Register from './users/Register'
import RegisterButton from './users/RegisterButton';
import Login from './users/Login'
import LoginButton from './users/LoginButton'
import Logout from './users/Logout'

import NewProfile from './books/NewProfile'
import Profiles from './books/Profiles'
import Books from './books/Books'

import MainPost from './forum/MainPost'
import NewPost from './forum/NewPost'

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      baseURL: process.env.REACT_APP_BASEURL,
      modalOpen: false, 
      newCommentModalOpen: false,
      commentModalOpen: false,
      profileModalOpen: false,
      userLoggedIn: false,
      profileButton: false,
      forumButton: true,
      loggedButton: false,
      commentButton: false,
      currentUserId: null,
      currentUserProfile: false,
      email: '',
      username: '',
      password: '',
      users: [],
      posts: [],
      comments: [],
      profiles: [],
      title: '',
      post: '',
      comment: '',
      name: '',
      location: '',
      profilepic: '',
      favebook: '',
      books: false,
      regButton: false,
      postToBeEdited: null,
      commentToBeEditd: null,
      profileToBeEdited: null,
      postToAddComment: null,
      bookSearched: '',
      selectedBook: '',
      selectedBookCover: '',
      bookInfo: []
    }
  }

  getBooks = (event) => {
    event.preventDefault()
    const searchURL = this.state.baseURL + '/books/search?title=' + this.state.bookSearched

    fetch (searchURL, {
        credentials: 'include'
    })
    .then (response => {
      return response.json()
    })
    .then (data => {
      this.setState({
        bookInfo: data.data.books,
        bookSearched: ''
      })
    })
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
      if (response.status === 200) {
        return response.json()
      } else {
        return []
      }  
    })
    .then(data => {
      this.setState({
        posts: data.data
      })
    })
  }

  getComments = () => {
    fetch (this.state.baseURL + '/posts/comments/', {
      credentials: 'include'
    })
    .then (response => {
      if (response.status === 200) {
        return response.json()
      } else {
        return []
      }
    })
    .then (data => {
        this.setState({
          comments: data.data
        })
    })
  }

  getProfiles = () => {
    fetch(this.state.baseURL + '/users/profiles', {
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
      this.setState({
        profiles: data.data
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

  addComment = (newComment) => {
    const copyComments = [...this.state.comments]
    copyComments.push(newComment)
    this.setState({
      comments: copyComments
    })
  }

  addProfile = (newProfile) => {
    const copyProfiles = [...this.state.profiles]
    copyProfiles.push(newProfile)
    this.setState({
      profiles: copyProfiles
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

  deleteProfile = (id) => {
    fetch(this.state.baseURL + '/users/profile/' + id, {
      method: 'DELETE'
    })
    .then (response => {
      const findIndex = this.state.profiles.findIndex(profile => profile.id === id)
      const copyProfiles = [...this.state.profiles]
      copyProfiles.splice(findIndex, 1)
      this.setState({
        profiles: copyProfiles,
        currentUserProfile: false
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

  bookClick = (event) => {
    let covers = document.getElementsByClassName('coverart');
    Array.from(covers).forEach((cover) => {
      cover.classList.remove('selectedart')
    })
    event.target.classList.add('selectedart')
    this.setState({
      selectedBook: event.target.id,
      selectedBookCover: event.target.src
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = async (event) => {
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
        const findIndex = this.state.comments.findIndex(comment => comment.id === updatedComment.id)
        const copyComments = [...this.state.comments]
        copyComments[findIndex] = updatedComment
        this.setState({
          comments: copyComments,
          commentModalOpen: false})
        }
    }
    catch(err){
      console.log('Error =>', err);
      }
  }

  handleProfileEdit = async (event) => {
    event.preventDefault()
    const URL = this.state.baseURL + '/users/profile/' + this.state.profileToBeEdited.id
    try {const response = await fetch(URL, {
      method: 'PUT',
      body: JSON.stringify({
        name: event.target.name.value,
        profilepic: event.target.profilepic.value,
        location: event.target.location.value,
        favebook: event.target.favebook.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      if (response.status === 200){
        const updatedProfile = (await response.json()).data
        console.log(updatedProfile)
        const findIndex = this.state.profiles.findIndex(profile => profile.id === updatedProfile.id)
        const copyProfiles = [...this.state.profiles]
        copyProfiles[findIndex] = updatedProfile
        this.setState({
          profiles: copyProfiles,
          profileModalOpen: false})
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
        return response.json()
    })
    .then (data => {
        this.addPost(data.data)
        this.setState({
            title: '',
            post: ''
        })  
    })
    .catch (error => console.log({'Error => ': error}))
  }

  handleProfileSubmit = async (event, id) => {
    event.preventDefault()
    fetch(this.state.baseURL + '/users/profile/new', {
        method: 'POST',
        body: JSON.stringify({
            name: this.state.name,
            location: this.state.location,
            profilepic: this.state.profilepic,
            favebook: this.state.selectedBookCover
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    .then (response => {
        return response.json()
    })
    .then (data => {
        this.addProfile(data.data)
        this.setState({
          name: '',
          location: '',
          profilepic: '',
          favebook: '',
          currentUserProfile: true,
          selectedBookCover: '',
          bookInfo: []
        }) 
    })
    .catch (error => console.log({'Error => ': error}))
  }

  handleSubmitNewComment = async (event, id) => {
  event.preventDefault()
  event.target.reset()
  fetch(this.state.baseURL + '/posts/comments/' + id, {
      method: 'POST',
      body: JSON.stringify({
          comment: this.state.comment
      }),
      headers: {
          'Content-Type': 'application/json'
      },
      credentials: 'include'
  })
  .then (response => {
      console.log('This is the response', response)
      return response.json()
  })
  .then (data => {
      this.addComment(data.data)
      this.setState({
        comment: '',
        newCommentModalOpen: false
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
        password: this.state.password
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    .then (response => {
      if (response.status === 201) {
        this.setState({
          userLoggedIn: true
        })
      }
      return response.json()
    })
    .then (data => {
      console.log('✨ Registration successful! 🎉')
      this.addUser(data)
      this.setState({
        email: '',
        password: '',
        currentUserId: data.data.id,
        userLoggedIn: true
      })
      this.checkLoggedIn()
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
          console.log('✨ Login successful! 🎉')
          this.setState({
            password: '',
            userLoggedIn: true,
            loggedButton: false,
            currentUserId: data.data.id,
            currentUserProfile: data.data.profilemade
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

  profileButton = () => {
    this.setState({
      profileButton: true,
      forumButton: false
    })
  }

  forumButton = () => {
    this.setState({
      forumButton: true,
      profileButton: false
    })
  }

  showEditForm = (post) => {
    this.setState({
      modalOpen: true,
      postToBeEdited: post
    })
  }

  showCommentEditForm = (comment) => {
    this.setState ({
      commentModalOpen: true,
      commentToBeEdited: comment
    })
  }

  showProfileEditForm = (profile) => {
    this.setState ({
      profileModalOpen: true,
      profileToBeEdited: profile
    })
  }

  showAddCommentForm = (id) => {
    this.setState ({
      newCommentModalOpen: true,
      postToAddComment: id
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
          console.log(body.data)
          this.setState({
            userLoggedIn: true,
            currentUserId: body.data.id,
            currentUserProfile: body.data.profilemade
          })
        })
        this.getPosts()
        this.getComments()
        this.getProfiles()
        console.log(`A user is currently logged in`)
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
        <RegisterButton 
          setButton={this.setButton1} 
          button={this.state.regButton} 
          loggedIn={this.state.userLoggedIn}
        />
        <Register 
          regButton={this.state.regButton} 
          loggedIn={this.state.userLoggedIn} 
          change={this.handleChange} 
          register={this.handleRegister} 
        />
        <LoginButton 
          button={this.state.loggedButton} 
          setButton={this.setButton2} 
          loggedIn={this.state.userLoggedIn}
        />
        <Login 
          login={this.loginUser} 
          change={this.handleChange} 
          loggedIn={this.state.userLoggedIn} 
          button={this.state.loggedButton} 
        />
        <Logout 
          logout={this.logoutUser} 
          loggedIn={this.state.userLoggedIn} 
          regButton={this.state.regButton} 
        />
        {this.state.userLoggedIn && 
          <NavBar 
            profileButton={this.profileButton} 
            forumButton={this.forumButton}
          />
        }
        <hr />
        {this.state.books && <Books />}
        {(this.state.posts && this.state.forumButton && this.state.userLoggedIn) && 
          <MainPost 
            posts={this.state.posts} 
            showEditForm={this.showEditForm} 
            modal={this.state.modalOpen} 
            handleChange={this.handleChange} 
            postToBeEdited={this.state.postToBeEdited} 
            handleSubmit={this.handleSubmit} 
            username={this.state.username} 
            currentUserId={this.state.currentUserId} 
            delete={this.deletePost} 
            comments={this.state.comments}
            // Edit Comments 
            commentEdit={this.showCommentEditForm} 
            deleteComment={this.deleteComment} 
            commentModal={this.state.commentModalOpen} 
            submitCommentEdit={this.handleCommentEdit} 
            commentToBeEdited={this.state.commentToBeEdited}
            // Add New Comments
            newCommentModal={this.state.newCommentModalOpen}
            showNewCommentForm={this.showAddCommentForm}
            handleSubmitNewComment={this.handleSubmitNewComment}
            postToAddComment={this.state.postToAddComment}
            comment={this.state.comment} 
          />
        }
        {(this.state.userLoggedIn && this.state.profileButton) && 
        <Profiles
          profiles={this.state.profiles}
          profileModal={this.state.profileModalOpen}
          submitProfileEdit={this.handleProfileEdit}
          profileToBeEdited={this.state.profileToBeEdited}
          profileEdit={this.showProfileEditForm}
          deleteProfile={this.deleteProfile}
          handleChange={this.handleChange} 
          currentUserId={this.state.currentUserId} 
         />
        }
        {
          (this.state.userLoggedIn && this.state.profileButton && this.state.currentUserProfile === false) && 
          <NewProfile 
            userLoggedIn={this.state.userLoggedIn} 
            handleProfileSubmit={this.handleProfileSubmit}
            handleChange={this.handleChange}
            getBooks={this.getBooks}
            bookSearched={this.state.bookSearched}
            selectedBookCover={this.state.selectedBookCover}
            bookInfo={this.state.bookInfo}
            bookClick={this.bookClick}
          />
        }
        <hr />
        {(this.state.userLoggedIn && this.state.forumButton) && 
          <NewPost 
            handleChange={this.handleChange} 
            handleSubmit={this.handleSubmitNew} 
            userLoggedIn={this.state.userLoggedIn} 
            baseURL={this.state.baseURL}
          />
        }
      </>
    )
  }
}