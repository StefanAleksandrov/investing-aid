import { useState, useReducer, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//firebase auth
import { auth } from './config/firebaseInit';

//style
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
import CurrencyRates from './components/CurrencyRates/CurrencyRates';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Notification from './components/Notification/Notification';

//Context
import NotificationContext from './contexts/NotificationContext';
import AuthContext from './contexts/AuthContext';

export default function App() {
  const [currentUser, setCurrentUser] = useState({
    uid: '',
    email: '',
    username: ''
  });

  const [notification, dispatch] = useReducer(notificationReducer, {
    message: '',
    type: ''
  });

  function notificationReducer(state, action) {
    switch (action.action) {
      case 'NOTIFY':
        setTimeout(() => {
          dispatch({ message: '', type: '', action: 'REMOVE' });
        }, 3000);
        const newState = { ...state, message: action.message, type: action.type }
        return newState;

      case 'REMOVE':
        return { ...state, message: '', type: '' }

      default:
        return state;
    }
  }
  
  useEffect(() => {
    // auth.onAuthStateChanged(setCurrentUser);

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
        <AuthContext.Provider value={[currentUser, setCurrentUser]} >
          <NotificationContext.Provider value={[notification, dispatch]}>
            <Header />
            <Notification />

            <Switch>
              <Route path='/' exact={true} component={Home} />
              <Route path='/about-us' exact={true} component={AboutUs} />
              <Route path='/sign-up' exact={true} component={SignUp} />
              <Route path='/sign-in' exact={true} component={SignIn} />
              <Route path='/profile' exact={true} render={(props) => <Profile {...props} currentUser={currentUser} />} />

              {/* In order to pass the currentUser as props WITH the Router props  we need to use the render method with arrow function */}
              <Route path='/add-record' exact={true} key="add" render={(props) => <AddRecord {...props} currentUser={currentUser} />} />
              <Route path='/edit/:id' exact={true} key="edit" render={(props) => <AddRecord {...props} currentUser={currentUser} />} />

              <Route path='/currency-rates' exact={true} component={CurrencyRates} />
              <Route path='*' exact={true} component={PageNotFound} />
            </Switch>

            <PageFooter />
          </NotificationContext.Provider>
        </AuthContext.Provider>
      </ BrowserRouter>
    </div>
  );
}