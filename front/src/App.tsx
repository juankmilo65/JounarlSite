import React from 'react';
import { Route, Switch } from "react-router-dom";
import Home from './components/pages/Home';
import UseSigIn from './components/Singin/useSingin'
import UseSingUp from './components/Singup/useSingup'
import UseDashboard from './components/Dashboard/useDashboard'
import './styles/common.css'

function App() {
  return <Switch>
    <Route path="/" component={Home} />
    {/* <Route exact path="/" component={UseSigIn} /> */}
    <Route path="/singUp" component={UseSingUp} />
    <Route path="/dashboard/:page" component={UseDashboard} />
  </Switch>
}

export default App;
