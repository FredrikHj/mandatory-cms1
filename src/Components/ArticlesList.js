import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';

export let ArticlesList = (props) => {
  let [ incommingArticles, setincommingArticles ] = useState([]);
  let [ pagSkip, setPagSkip ] = useState(0);
  let [ pagLimit, setPagLimit ] = useState(10);
  let [ searchArticle, setSearchArticle ] = useState(' '); // Varför space. annars infogas inte data till tabellen?

  useEffect(() =>{
    // Get Articles
    axios.get(
      `https://cmslabb1.devspace.host/api/collections/get/Artiklar?skip=${pagSkip}&limit=${pagLimit}&sort[published_on]=-1`, {
        headers: { 'Cockpit-Token': '3dcadbb31033dd704673a595544b15' }
    })
    .then(response => {
      //console.log(response);
        setincommingArticles(response.data.entries);
    })
    .catch((error) => {
      //console.log(error);
    });
  }, []);
  function inputSearchArticle(e) {
    let targetArticle = e.target.value;
    setSearchArticle(targetArticle);
  }
   let filterArticle = incommingArticles.filter((articleListData) => {
     return articleListData.title.includes(searchArticle)
    }
  )
  function articleSkip(e) {
    let targetNr = e.target.value;
    setPagSkip(targetNr);   
  }
  function limitSide(e) {
    let targetNr = e.target.value;
    setPagLimit(targetNr);
  }

  return(
    <>
      <p className="headLine">Författarblogg</p>
      <section id="inputContainer">
        Sök artikel --> <input className="inputWitdhSearch" type="text" onChange={ inputSearchArticle }/><br/><br/>
        <section id="pagContainer">
          Visa endast<br/>
          <section id="articlesPagination">
            <p> Hoppa antal --> <input className="inputWitdh" type="number" onChange={ articleSkip }/></p> 
            <p> Begränsa antal --> <input  className="inputWitdh" type="number" onChange={ limitSide }/></p> 
          </section>
        </section>
      </section>
      
      <div className="pageArticleList">
        {(incommingArticles.length === 0)
          ? <p id="listGetting">Listan hämtas ...</p>
          : <table id="articles">
            <thead>
            <tr><th>Titel</th><th>Författare</th><th>Datum</th></tr>
            </thead>
            <tbody>
              {
                filterArticle.map((obj, articlesCount) => {
                  articlesCount += 1;                  
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
          </table >
        }
      </div>
    </>
  );
}