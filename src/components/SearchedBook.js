import React, { useState } from 'react';
import SaveBtn from './SaveBtn';
import Saved from './Saved';
const axios = require('axios');

function SearchedBook( props ){

  const [saved, setSaved] = useState(false)

  const bookData = {
    bookID: props.bookID,
    title: props.title,
    authors: props.authors[0],
    description: props.description, 
    link: props.link,
    image: props.image
  };

  console.log(bookData)

  async function saveBook(){
    try {
      const result = await axios.post('/api', bookData);
      console.log("Post Success", result)
    } catch (err) {
        console.log("POST ERROR", err)
    };
  };

  function handleSave(){
    console.log("Saving book: ", bookData)
    saveBook();
    setSaved(true);
  };

  return (
    <div className="book-container">
      <div className="book-image">
        <img src={props.image} alt="book-cover"/>        
      </div>
      <div className="book-info">
        <h2>{props.title}</h2>
        <h3>{props.authors[0]}</h3>
        <p>{props.description}</p>
        { !saved ? 
          <SaveBtn handleSave={handleSave} />
          :
          <Saved />
        }
        <a href={props.link} target="_blank" rel="noopener noreferrer">Preview</a>
      </div>
    </div>
  )
};

SearchedBook.defaultProps = {
  title: "",
  description: "",
  image: "https://via.placeholder.com/150",
  link: "",
  authors: ""
};

export default SearchedBook;