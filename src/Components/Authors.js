import React, { useState, useEffect } from 'react';
import {Helmet} from "react-helmet";
import axios from 'axios';

//import { updateCurrentIndex, currentIndex$ } from './Store.js';

export let Authors = (props) => {
  let [authors, setAuthors ] = useState([]);    
  
  useEffect(() => {
    // Get Authors
    axios.get('http://192.168.99.100:8080/api/collections/get/Forfattare', {
      headers: { 'Cockpit-Token': '3dcadbb31033dd704673a595544b15}' }
    })
    .then(response => {
      console.log(response);
      setAuthors(response.data.entries)
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);
  
  // Fix the patchname, will only get the blogg Nr
  let bloggNr = props.location.pathname;
  let cleanedBloggNr = bloggNr.split('/')[2]-1;


  let insertBloggData = props.sendAuthors[cleanedBloggNr];
  console.log(insertBloggData);
  
  // Clean the data from comma
  let cleanAuthor = insertBloggData.name.split(',')[0];
  console.log(cleanAuthor);
  
  return(       
    <div className="page">
      <p className="headLine">{ 'Författarblogg - ' + cleanAuthor}</p>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{ 'Författarblogg' + ' - ' + cleanAuthor }</title>
      </Helmet>
      <table id="articles">
        <thead>
          <tr><th>Namn</th><th>Beskrivning</th><th>Porträtt</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>{ cleanAuthor }</td>
            <td>{ insertBloggData.description }</td>
            <td><img src={ insertBloggData.avatar.path }/></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}