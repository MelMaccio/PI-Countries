import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import CountryDetail from './components/CountryDetail';
import CreateActivity from './components/CreateActivity';
import Home from './components/Home';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <React.Fragment>
      <Route path={'/'} component={LandingPage} exact/>
      <Route path={'/countries'} component={Home} exact/>
      <Route path={'/countries/:id'} component={CountryDetail} exact/>
      <Route path={'/activities'} component={CreateActivity} exact/>
    </React.Fragment>
  );
}

export default App;
