import React, { useState } from 'react';
import './SavedBook.css';
import { Link } from 'react-router-dom';
const axios = require('axios');

function SavedBook(props){

  const [display, setDisplay] = useState(true);
  const bookData = { deleteID: props.dbID };

  async function deleteBook(){
    try {
      const result = await axios.delete(`/api/delete/${bookData.deleteID}`);
      console.log(result);
    } catch (err) {
      console.log("ERROR", err);
    };
  };

  function handleDelete(){
    console.log("DELETE BOOK --", bookData);
    deleteBook();
    setDisplay(false);
    //props.setNumber(prev => prev - 1);
    props.setBooksDisplay(prev => prev - 1)
  };

  return (
    <>
      { display && 
        <div className="saved-book-container">
          <div className="remove-button">
            <button onClick={handleDelete}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20"  height="20" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button> 
          </div>
          <Link to={`book/${props.isbn}`} className="saved-book-link">
            <div className="saved-book-image">
              <img src={props.image} alt="book-cover"/>
            </div>
            <div className="saved-book-info">
              <h2>{props.title}</h2>
              <h3>{props.authors}</h3>
            </div>
          </Link>
        </div>
      }
    </>
  )
};

export default SavedBook;

