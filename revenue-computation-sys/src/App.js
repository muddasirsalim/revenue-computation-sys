import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Row ,Container,Col, Form, FormGroup, Label, Input, Button} from 'reactstrap';
import { BrowserRouter as Router,Switch,Route , Redirect} from "react-router-dom";
import './App.css';
import './index.css';

import Individual from './components/individual/index';
import Navbar from "./components/navbar.component"
import TollsList from "./components/tolls-list.component";
import EditToll from "./components/edit-toll.component";
import CreateToll from "./components/create-toll.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar/>
      <br/>
      <Route path="/" exact component={TollsList} />
      <Route path="/edit/:id" component={EditToll} />
      <Route path="/create" component={CreateToll} />
      <Route path="/user" component={CreateUser} />
      <Route path="/login" component={Individual} />
        
      </div>
    </Router>
  );
}

export default App;
