import React, { useState, useEffect } from 'react';
import {Helmet} from "react-helmet";
import axios from 'axios';

export let ArticlesDetail = (props) => {
  let [ incomminArticles, setIncomminArticles ] = useState([]);
  //let [index, setIndex ] = useState(0);
  //let bloggNr = props.location.pathname;
  //let cleanedBloggNr = bloggNr.split('/')[2]-1;
  
  console.log(props);
  
  useEffect(() => {
    console.log('vfd');
    
    // Get Articles
    axios.get('http://192.168.99.100:8080/api/collections/get/Artiklar', {
        headers: { 'Cockpit-Token': '3dcadbb31033dd704673a595544b15}' }
    })
    .then(response => {
        console.log(response);
          setIncomminArticles(response.data.entries);
    })
    .catch((error) => {
        console.log(error);
    });
  }, []);
  console.log(incomminArticles);
  
  // Fix the patchname, will only get the blogg Nr
  let articleIndex = props.location.pathname.split('/')[2]-1;
  
  
  let article = incomminArticles[articleIndex];
  console.log(article);
  
  let choosenTitle = article;

  // Clean the data from comma
  let cleanAuthor = article;//.author[0].display.split(',');
console.log(cleanAuthor);

  return(       
    <div className="page">
{/*       <p className="headLine">{ 'Författarblogg - ' + choosenTitle }</p>
 */}      <Helmet>
        <meta charSet="utf-8" />  
        <title>{ 'Författarblogg' + ' - ' + choosenTitle }</title>
      </Helmet>
      <table id="articles">
        <thead>
          <tr><th>Titel</th><th>Författare</th><th>Datum</th></tr>
        </thead>
        <tbody>
           <tr>
            {/* <td>{ article.title }</td>
            <td>{ cleanAuthor }</td>
            <td>{ article.published_on }</td> */}
          </tr>
          <tr>
            <th>Beskrivnning</th>
          </tr>
          <tr>
{/*             <td colSpan="1">{ insertBloggData.body}</td>
 */}          </tr>
        </tbody>
      </table>
    </div>
  );
}