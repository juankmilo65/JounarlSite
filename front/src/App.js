import React from 'react';
import { Route, Switch } from "react-router-dom";
import UseSigIn from './components/Singin/useSingin'

function App() {
  return <Switch>
    <Route exact path="/" component={UseSigIn} />
    {/* <Route path="/history" component={useMapHistory} />
    <Route path="/mapHistory" component={useCheckHistory} /> */}
  </Switch>
}

export default App;
