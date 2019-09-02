import React, { Component } from 'react';
import axios from 'axios';
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
      incomminArticles: [],
      incomminAuthors: [],
    }
  }
  componentDidMount() {
    // Get Articles
    axios.get('http://192.168.99.100:8080/api/collections/get/Artiklar', {
      headers: { 'Cockpit-Token': '3dcadbb31033dd704673a595544b15}' }
    })
    .then(response => {
      console.log(response);
      this.setState({incomminArticles: response.data.entries});
    })
    .catch((error) => {
      console.log(error);
    });
    // Get Authors
    axios.get('http://192.168.99.100:8080/api/collections/get/Forfattare', {
      headers: { 'Cockpit-Token': '3dcadbb31033dd704673a595544b15}' }
    })
    .then(response => {
      console.log(response);
      this.setState({incomminAuthors: response.data.entries})
    })
    .catch((error) => {
      console.log(error);
    });
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
         
          <Route exact path="/" render={(props) => <ArticlesList {...props}
            sendArticlesList={ this.state.incomminArticles }
            />}
            />
          <Route exact path="/Articles/:id" render={(props) => <ArticlesDetail {...props}
            sendArticles={ this.state.incomminArticles }
            />}
          />
          <Route exact path="/Authors/:id" render={(props) => <Authors {...props}
            sendAuthors={ this.state.incomminAuthors }
            />}
          />

        </div>
      </Router>
    );
    if (this.state.redirectList === true) return <Redirect to="/"/>;
  }
}

export default MainApp;