import './App.css';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Home from './components/main/Home';
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import AddPost from './components/post/AddPost';
import { useEffect } from 'react';
import { isAuthenticated } from './components/auth/helper/helper';
import Profile from './components/user/Profile';

function App() {

  return (
    <BrowserRouter>   
        <Switch>
            <Route path="/signin" exact component={Signin} />
            <Route path="/" exact component={Home} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/add" exact component={AddPost} /> 
            <Route path="/profile" exact component={Profile} /> 

        </Switch>     
    </BrowserRouter>
  );
}

export default App;
