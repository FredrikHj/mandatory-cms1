import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';

export let ArticlesList = (props) => {
  let [ incommingArticles, setincommingArticles ] = useState([]);
  let [ pagSkip, setPagSkip ] = useState(0);
  let [ pagLimit, setPagLimit ] = useState(10);

  useEffect(() =>{
    console.log();
    
    // Get Articles
    axios.get('http://192.168.99.100:8080/api/collections/get/Artiklar?skip=' + pagSkip + '&limit=' + pagLimit, {
        headers: { 'Cockpit-Token': '3dcadbb31033dd704673a595544b15}' }
    })
    .then(response => {
        console.log(response);
        setincommingArticles(response.data.entries);
    })
    .catch((error) => {
        console.log(error);
    });
  }, []);
  function searchArticle(e) {
    let targetArticle = e.target.value;
    console.log(targetArticle);
    
  }
  function articleSkip(e) {
    let targetNr = e.target.value;
    setPagSkip(targetNr);
    console.log(targetNr);
    
  }
  function limitSide(e) {
    let targetNr = e.target.value;
    setPagLimit(targetNr);
    console.log(targetNr);
  }

  return(
    <>
      <p className="headLine">Författarblogg</p>
      Sök en artikel --> <input className="inputWitdhSearch" type="text" onChange={ searchArticle }/><br/><br/>
      <section id="pagContainer">
        Visa endast<br/>
        <section id="articlesPagination">
          <p> Hoppa antal --> <input className="inputWitdh" type="number" onChange={ articleSkip }/></p> 
          <p> Begränsa antal --> <input  className="inputWitdh" type="number" onChange={ limitSide }/></p> 
        </section>
      </section>
      <div className="page">
        <table id="articles">
          <thead>
          <tr><th>Titel</th><th>Författare</th><th>Datum</th></tr>
          </thead>
          <tbody>
            {
              incommingArticles.map((obj, articlesCount) => {
                articlesCount += 1;
                console.log(obj);
                
                // Clean the data from comma
                let cleanAuthor = obj.author[0].display.split(',');

                return (
                  <tr key={articlesCount}>
                    <td><Link to={"/Articles/" + obj._id }>{ obj.title }</Link></td>
                    <td><Link to={"/Authors/" + obj.author[0]._id }>{ cleanAuthor }</Link></td>
                    <td>{ obj.published_on }</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    </>
  );
}