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
    
    let articleNr = props.match.params.id;
    // Get Articles
    axios.get('http://192.168.99.100:8080/api/collections/get/Artiklar' + articleNr, {
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
  // Fix the choosen Articles title
  let choosenTitle = incomminArticles.title;

  // Clean the data from comma
  let cleanAuthor = incomminArticles.author[0].display.split(',');
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