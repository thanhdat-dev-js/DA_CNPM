import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './firebase/config';
import Login from "./components/login";


import AuthProvider from './context/AuthProvider';
import Workspace from './components/workspace/index';



function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route component={Login} exact path='/login' />
          <Route component={Workspace} exact path='/' />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
