import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';

export let ArticlesList = (props) => {
  let [ incommingArticles, setincommingArticles ] = useState([]);
  let [ articlesTotal, setArticlesTotal ] = useState(0);
  let [ pageNr, setPageNr ] = useState(1);

  let [changeSkip, setChangeSkip ] = useState(0);

  //let revSkip = 
  let [ articlesLimit ] = useState(5); // Article /Page
  let [ searchArticle, setSearchArticle ] = useState(' '); // Varför space. annars infogas inte data till tabellen?
  
  let pages = 1;
  let getIntoPage = 0;

  useEffect(() =>{
    // Get Articles
    axios.get(`https://cmslabb1.devspace.host/api/collections/get/Artiklar?skip=${changeSkip}&limit=${articlesLimit}&sort[published_on]=-1`, {
        headers: { 'Cockpit-Token': '3dcadbb31033dd704673a595544b15' }
    })
    .then(response => {
      //console.log(response);
      setincommingArticles(response.data.entries);
      setArticlesTotal(response.data.total)
    })
    .catch((error) => {
      //console.log(error);
    });
  }, [changeSkip]);

  function inputSearchArticle(e) {
    let targetArticle = e.target.value;
    setSearchArticle(targetArticle);
  }
   let filterArticle = incommingArticles.filter((articleListData) => {
     return articleListData.title.includes(searchArticle)
    }
  )
  function setPageDecrease() {
    pages = pageNr - 1;
    getIntoPage = (pageNr - 1)*articlesLimit-articlesLimit; //Calculate page´s
   
    if (pages < 1) return;
    else{
      setPageNr(pages);
      setChangeSkip(getIntoPage);
    } 
  }
  function setPageIncrease() {
    pages = pageNr + 1;
    getIntoPage = (pageNr + 1)*articlesLimit-articlesLimit;  //Calculate page´s
    if (articlesTotal > incommingArticles.length+1) return;
    else {
      setPageNr(pages);
      setChangeSkip(getIntoPage);
    }
  }
  return(
    <>
      <p className="headLine">Författarblogg</p>
      <section id="inputSearchContainer">
        Sök artikel --> <input className="inputWitdhSearch" type="text" onChange={ inputSearchArticle }/><br/><br/>
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
        <section id="pageControlContainer">
          <section id="setPageContainer">
            <button onClick={ setPageDecrease }> - </button> <p id="sideNr">{ pageNr }</p> <button onClick={ setPageIncrease }>+</button>            
          </section>
        </section>
    </>
  );
}