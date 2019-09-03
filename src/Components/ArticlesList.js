import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';

export let ArticlesList = (props) => {
  let [ incomminArticles, setIncomminArticles ] = useState([]);
/*   let showList = props.sendArticlesList;
 */
  useEffect(() =>{
    console.log();
    
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

  return(
    <div className="page">
      <p className="headLine">Författarblogg</p>
      Sök efter en film:<br/>
      <input type="text" />
      Visa
      Sidor --> <input type="number"/>
      Antal --> <input type="number" />
      <table id="articles">
        <thead>
        <tr><th>Titel</th><th>Författare</th><th>Datum</th></tr>
        </thead>
        <tbody>
           {
            incomminArticles.map((obj, articlesCount) => {
              articlesCount += 1;
              // Clean the data from comma
              let cleanAuthor = obj.author[0].display.split(',');

              return (
                <tr key={articlesCount}>
                  <td><Link to={"/Articles/" + articlesCount }>{ obj.title }</Link></td>
                  <td><Link to={"/Authors/" + articlesCount }>{ cleanAuthor }</Link></td>
                  <td>{ obj.published_on }</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}