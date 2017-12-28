import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import ListShelves from './listshelves'
import Search from './search'


class BooksApp extends Component {
  render() {
    return (
      <div className="app">
        <Route path="/search" component={Search}/>
        <Route exact path="/" component={ListShelves}/>
      </div>
     )
  }
}

export default BooksApp
