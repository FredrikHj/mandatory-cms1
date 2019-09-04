import React, { useState, useEffect } from 'react';
import {Helmet} from "react-helmet";
import axios from 'axios';

//import { updateCurrentIndex, currentIndex$ } from './Store.js';

export let Authors = (props) => {
  let [author, setAuthor ] = useState(null);    
  
  useEffect(() => {
    let authorId = props.match.params.id;
    console.log(authorId);
    
    // Get Author
    axios.get('http://192.168.99.100:8080/api/collections/get/Forfattare?filter[_id]=' + authorId, {
      headers: { 'Cockpit-Token': '3dcadbb31033dd704673a595544b15}' }
    })
    .then(response => {
      console.log(response.data.entries[0]);
      setAuthor(response.data.entries[0])
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);
  if (!author) {
    return <p>hej</p>;
  }
  // Fix the patchname, will only get the blogg Nr
/*   let bloggNr = props.location.pathname;
  let cleanedBloggNr = bloggNr.split('/')[2]-1;

  let insertBloggData = props.sendAuthors[cleanedBloggNr];
  console.log(insertBloggData);
 */  
  // Clean the data from comma
  let cleanAuthor = author.name.split(',')[0];
  console.log(cleanAuthor);
  return(      
    <> 
      <p className="headLine">{ 'Författarblogg - ' + cleanAuthor}</p>
      <div className="page">
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
              <td>{ author.description }</td>
              <td><img className="authorImg" src={'http://192.168.99.100:8080/' + author.avatar.path } alt="Ett porträtt"/></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}