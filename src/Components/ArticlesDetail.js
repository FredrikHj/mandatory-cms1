import React, { useState, useEffect } from 'react';
import {Helmet} from "react-helmet";
//import { updateCurrentIndex, currentIndex$ } from './Store.js';

export let ArticlesDetail = (props) => {
  //let [index, setIndex ] = useState(0);
  let bloggNr = props.location.pathname;
  let cleanedBloggNr = bloggNr.split('/')[2]-1;
/*   useEffect(() => {
    currentIndex$.subscribe((currentIndex) => {
      console.log(currentIndex);
      setIndex(currentIndex);
    });
  }, [bloggNr]); */
  /*     updateCurrentIndex(cleanedBloggNr);
  window.localStorage.setItem('cleanedBloggNr', cleanedBloggNr);
  */
  // Fix the patchname, will only get the blogg Nr
  let insertBloggData = props.sendArticles[cleanedBloggNr];
  let choosenTitle = insertBloggData.title;

  // Clean the data from comma
  let cleanAuthor = insertBloggData.author[0].display.split(',');

  return(       
    <div className="page">
      <p className="headLine">{ 'Författarblogg - ' + choosenTitle }</p>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{ 'Författarblogg' + ' - ' + choosenTitle }</title>
      </Helmet>
      <table id="articles">
        <thead>
          <tr><th>Titel</th><th>Författare</th><th>Datum</th></tr>
        </thead>
        <tbody>
          <tr>
             <td>{ insertBloggData.title }</td>
            <td>{ cleanAuthor }</td>
            <td>{ insertBloggData.published_on }</td>
          </tr>
          <tr>
            <th>Beskrivnning</th>
          </tr>
          <tr>
            <td colSpan="1">{ insertBloggData.body}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}