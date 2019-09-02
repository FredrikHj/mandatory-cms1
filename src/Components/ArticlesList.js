import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

export let ArticlesList = (props) => {
  let showList = props.sendArticlesList;

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
            showList.map((obj, articlesCount) => {
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