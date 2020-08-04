import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './components/auth/login';
import Admin from './components/admin/admin';
import PrivateRoute from './components/routecustom/privateroute';
import Test from './components/test'
function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/test" component={Test} />
              <PrivateRoute path="/" component={Admin} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
