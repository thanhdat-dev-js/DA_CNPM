import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './firebase/config';
import Login from "./components/login";


import Home from './components/home/index';
import AuthProvider from './context/AuthProvider';



function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route component={Login} exact path='/login' />
          <Route component={Home} exact path='/' />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
