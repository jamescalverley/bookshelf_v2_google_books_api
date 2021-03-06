import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ErrorBoundary from './components/errors/ErrorBoundary';
import NavBar from './components/NavBar/NavBar';
import HomePage from './components/HomePage/HomePage';
import SearchPage from './components/SearchPage/SearchPage';
import SavedPage from './components/SavedPage/SavedPage';
import BookDetails from './components/BookDetails/BookDetails';
const axios = require('axios');

function App() {
  
  async function getUserID(){
    const result = await axios.get('/api/user/setID');
    const userID = result.data.userID;
    return userID
  };

  async function checkLocalstorage(){
    const localID = localStorage.getItem("userID");
    if( localID === null ){
      const userID = JSON.stringify( await getUserID() );
      localStorage.setItem( "userID", userID );
    } else {
      return 
    };
  };

  useEffect( () => {
    checkLocalstorage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  return (
    <Router>
      <div className="App">
        <NavBar />
        <ErrorBoundary>
          <Route exact path={"/"}>
            <HomePage />
          </Route>      
          <Route path={"/search/:searchterm?"}>
            <SearchPage />
          </Route>
          <Route exact path={"/savedbooks"}>
            <SavedPage />
          </Route>
          <Route path={"/book/:book"}>
            <BookDetails />
          </Route>
        </ErrorBoundary>
      </div>
    </Router>
  );
}

export default App;

