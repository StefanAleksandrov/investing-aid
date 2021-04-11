import { useState, useReducer, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

import Header from './components/Header/Header';
import PageFooter from './components/Footer/Footer';
import Home from './components/Home/Home';
import AboutUs from './components/AboutUs/AboutUs';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import Profile from './components/Profile/Profile';
import MyInvestments from './components/MyInvestments/MyInvestments';
import AddInvestment from './components/AddInvestment/AddInvestment';
import CurrencyRates from './components/CurrencyRates/CurrencyRates';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Notification from './components/Notification/Notification';

import NotificationContext from './contexts/NotificationContext';
import AuthContext from './contexts/AuthContext';

import isAuth from './hoc/isAuth';
import isGuest from './hoc/isGuest';

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
    if (localStorage.uid || localStorage.email || localStorage.username) {
      setCurrentUser({
        uid: localStorage.uid,
        email: localStorage.email,
        username: localStorage.username,
      });
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
              {/* Route Guard */}
              <Route path='/about-us' exact={true} component={isGuest(AboutUs)} />
              <Route path='/sign-up' exact={true} component={SignUp} />
              <Route path='/sign-in' exact={true} component={SignIn} />
              <Route path='/profile' exact={true} component={Profile} />
              <Route path='/my-investments' exact={true} component={MyInvestments} />
              <Route path='/add-investment' exact={true} key="add" component={AddInvestment} />
              <Route path='/edit/:id' exact={true} key="edit" component={AddInvestment} />
              {/* Route Guard */}
              <Route path='/currency-rates' exact={true} component={isAuth(CurrencyRates)} />
              <Route path='*' component={PageNotFound} />
            </Switch>

            <PageFooter />
          </NotificationContext.Provider>
        </AuthContext.Provider>
      </ BrowserRouter>
    </div>
  );
}