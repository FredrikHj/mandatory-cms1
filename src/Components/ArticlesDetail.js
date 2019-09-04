import React, { useState, useEffect } from 'react';
import {Helmet} from "react-helmet";
import axios from 'axios';

export let ArticlesDetail = (props) => {
  let [ incommingArticle, setIncomminArticle ] = useState(null);
  console.log(props);
  
  useEffect(() => {
    let articleId = props.match.params.id;

    // Get Articles
    axios.get('http://192.168.99.100:8080/api/collections/get/Artiklar?filter[_id]=' + articleId, {
    headers: { 'Cockpit-Token': '3dcadbb31033dd704673a595544b15}' }
  })
    .then(response => {
      console.log(response.data.entries[0]);
      setIncomminArticle(response.data.entries[0]);
    })
    .catch((error) => {
        console.log(error);
    });
  }, []);  
 
  if (!incommingArticle) {
    return <p>hej</p>;
  }

  // Fix the choosen Articles title
  let choosenTitle = incommingArticle.title;
  console.log(choosenTitle);

  return(       
    <>
      <p className="headLine">{ 'Författarblogg - ' + choosenTitle }</p>
      <div className="page">
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
              <td>{ incommingArticle.title }</td>
              <td>{ incommingArticle.author[0].display.split(',') }</td>
              <td>{ incommingArticle.published_on }</td>
            </tr>
            <tr>
              <th>Beskrivnning</th>
            </tr>
            <tr>
                <td colSpan="1">{ incommingArticle.body}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}