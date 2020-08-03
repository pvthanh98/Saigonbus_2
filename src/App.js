import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './components/auth/login';
import Admin from './components/admin/admin';
import PrivateRoute from './components/routecustom/privateroute';
function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
              <Route exact path="/login" component={Login} />
              <PrivateRoute path="/" component={Admin} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
