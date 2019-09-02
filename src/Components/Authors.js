import React, { useState, useEffect } from 'react';
import {Helmet} from "react-helmet";
//import { updateCurrentIndex, currentIndex$ } from './Store.js';

export let Authors = (props) => {
//let [authors, setAuthors ] = useState([]);    
  
  // Fix the patchname, will only get the blogg Nr
  let bloggNr = props.location.pathname;
  let cleanedBloggNr = bloggNr.split('/')[2]-1;
/*   updateCurrentIndex(cleanedBloggNr);
  window.localStorage.setItem('cleanedBloggNr', cleanedBloggNr);
 */
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