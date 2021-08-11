import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Places from '../../views/Places/Places';
import Appointments from '../../views/Appointments/Appointments';
import Admin from '../../views/Admin/Admin';
import NavBar from '../Navbar/Navbar';

function App() {
  return (
    <div className='App'>
      <NavBar />
      <div className='main__container'>
        <Router>
          <Switch>
            <Route path='/' exact component={Places}></Route>
            <Route path='/appointments' exact component={Appointments}></Route>
            <Route path='/admin' exact component={Admin}></Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
