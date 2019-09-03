import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';

export let ArticlesList = (props) => {
  let [ incomminArticles, setIncomminArticles ] = useState([]);
  let [ pagSkip, setPagSkip ] = useState(10);
  let [ pagLimit, setPagLimit ] = useState(1);

  useEffect(() =>{
    console.log();
    
    // Get Articles
    axios.get('http://192.168.99.100:8080/api/collections/get/Artiklar?skip=' + pagSkip + '&limit=' + pagLimit, {
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
  function searchArticle(e) {
    let targetArticle = e.target.value;
    console.log(targetArticle);
    
  }
  function changeShowPage(e) {
    let targetNr = e.target.value;
    setPagSkip(targetNr);
    console.log(targetNr);
    
  }
  function changeShowEach(e) {
    let targetNr = e.target.value;
    setPagLimit(targetNr);
    console.log(targetNr);
  }
  return(
    <div className="page">
      <p className="headLine">Författarblogg</p>
      
      Sök en artikel --> <input className="inputWitdhSearch" type="text" onChange={ searchArticle }/><br/><br/>
      <section id="pagContainer">
        Visa endast<br/>
        <section id="articlesPagination">
          <p> Antal Sidor --> <input className="inputWitdh" type="number" onChange={ changeShowPage }/></p> 
          <p> Antal artiklar --> <input  className="inputWitdh" type="number" onChange={ changeShowEach }/></p> 
        </section>
      </section>
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