import React from 'react';
import { Route, Switch } from "react-router-dom";
import UseSigIn from './components/Singin/useSingin'
import UseSingUp from './components/Singup/useSingup'

function App() {
  return <Switch>
    <Route exact path="/" component={UseSigIn} />
    <Route path="/singUp" component={UseSingUp} />
    {/*<Route path="/mapHistory" component={useCheckHistory} /> */}
  </Switch>
}

export default App;
