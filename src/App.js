import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

//Components
import Header from './components/Header/Header';
import PageFooter from './components/Footer/Footer';
import Home from './components/Home/Home';
import AboutUs from './components/AboutUs/AboutUs';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import Profile from './components/Profile/Profile';
import AddRecord from './components/AddRecord/AddRecord';
import { auth } from './config/firebaseInit';

export default function App() {
  const [ currentUser, setCurrentUser ] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged( setCurrentUser );
  }, []);

  useEffect(() => {
    if (localStorage.user || localStorage.email) {
      setCurrentUser({
        uid: localStorage.user,
        email: localStorage.email,
        username: localStorage.username,
      })
    }
  }, []);
  
  return (
    <div className="App">
      <BrowserRouter>
        <Header currentUser={currentUser} />

        <Switch>
          <Route path='/' exact={true} component={Home} />
          <Route path='/about-us' exact={true} component={AboutUs} />
          <Route path='/sign-up' exact={true} component={SignUp} />
          <Route path='/sign-in' exact={true} component={SignIn} />
          <Route path='/profile' exact={true} render={(props) => <Profile {...props} currentUser={currentUser} />} />
          
          {/* In order to pass the currentUser as props WITH the Router props  we need to use the render method with arrow function */}
          <Route path='/add-record' exact={true} key="add" render={(props) => <AddRecord {...props} currentUser={currentUser} />} />
          <Route path='/edit/:id' exact={true} key="edit" render={(props) => <AddRecord {...props} currentUser={currentUser} />} />
        </Switch>

        <PageFooter />
      </ BrowserRouter>
    </div>
  );
}