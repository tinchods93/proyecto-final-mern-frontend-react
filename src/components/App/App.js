import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../../views/Home';
import Places from '../../views/Places/Places';
import Appointments from '../../views/Appointments/Appointments';
import Autor from '../../views/Autor';
import Admin from '../../views/Admin';
import NavBar from '../Navbar/Navbar';

function App() {
  return (
    <div className='App'>
      <NavBar />
      <div className='main__container'>
        <Router>
          <Switch>
            <Route path='/' exact component={Home}></Route>
            <Route path='/places' exact component={Places}></Route>
            <Route path='/appointments' exact component={Appointments}></Route>
            <Route path='/autor' exact component={Autor}></Route>
            <Route path='/admin' exact component={Admin}></Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
