import React from 'react';
import '../assets/App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from '../views/Home/Home';
import Appointments from '../views/Appointments/Appointments';
import NewAppointmentView from '../views/Appointments/NewAppointmentView';
import SearchAppointmentView from '../views/Appointments/SearchAppointmentView';
import NavBar from './Navbar';

function App() {
  return (
    <div className='App'>
      <NavBar />
      <div className='main__container'>
        <Router>
          <Switch>
            <Route path='/' exact component={Home}></Route>
            <Route path='/appointments' exact component={Appointments}></Route>
            <Route
              path='/appointments/new'
              exact
              component={NewAppointmentView}></Route>
            <Route
              path='/appointments/search'
              exact
              component={SearchAppointmentView}></Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
