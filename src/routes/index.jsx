import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { BooksPage, SearchPage } from '../views';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <BooksPage />} />
        <Route exact path="/search" render={() => <SearchPage />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
