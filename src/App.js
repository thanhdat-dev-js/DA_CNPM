import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './firebase/config';
import Login from "./components/login";
import AppProvider from './context/AppProvider';
import AuthProvider from './context/AuthProvider';
import ViewProvider from './context/ViewProvider';
import Home from './components/home/index';
import AddMemberModal from './components/modal/AddMemberModal';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
        <ViewProvider>
          <Switch>
            <Route component={Login} exact path='/login' />
            <Route component={Home} exact path='/' />
          </Switch>
          </ViewProvider>
          <AddMemberModal/>
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
