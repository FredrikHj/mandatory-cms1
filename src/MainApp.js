import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import { ArticlesDetail } from './Components/ArticlesDetail.js';
import { ArticlesList } from './Components/ArticlesList.js';
import { Authors } from './Components/Authors.js';

class MainApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headLine: '',
      redirectList: true,
      incomminAuthors: [],
    }
  }
  render() {
    return (
      <Router>
        <Helmet>
        <meta charSet="utf-8" />
        <title>{'Författarblogg'}</title>
        </Helmet>
        <div id="appBody">
          
          <div id="headLinks">
            <Link to="/"><p>Hem</p></Link>
            {/* <Link to="/Add"><p>Lägga till</p></Link> */}
          </div>
         
          <Route exact path="/" component={ ArticlesList }/>
          <Route exact path="/Articles/:id" component={ ArticlesDetail }/>
          <Route exact path="/Authors/:id" component={ Authors }/>
        </div>
      </Router>
    );
    if (this.state.redirectList === true) return <Redirect to="/"/>;
  }
}

export default MainApp;