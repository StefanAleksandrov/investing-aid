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

export default function App() {
  const [ currentUser, setCurrentUser ] = useState(null);
  const [notification, dispatch] = useReducer(notificationReducer, {
      message: '',
      type: ''
  });

  function notificationReducer (state, action) {
      switch (action.action) {
          case 'NOTIFY':
              setTimeout(() => {
                  dispatch({message:'', type:'', action: 'REMOVE'});
              }, 3000);

              return {...state, message: action.message, type: action.typej}
          case 'REMOVE':
              return {...state, message: '', type: ''}
          default:
              return state;
      }
  }

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
        <Notification message={notification.message} type={notification.type} />

        <Switch>
          <Route path='/' exact={true} component={Home} />
          <Route path='/about-us' exact={true} component={AboutUs} />
          {/* <Route path='/sign-up' exact={true} component={SignUp} /> */}
          <Route path='/sign-up' exact={true} render={(props) => <SignUp {...props} dispatch={dispatch} />} />
          <Route path='/sign-in' exact={true} component={SignIn} />
          <Route path='/profile' exact={true} render={(props) => <Profile {...props} currentUser={currentUser} />} />
          
          {/* In order to pass the currentUser as props WITH the Router props  we need to use the render method with arrow function */}
          <Route path='/add-record' exact={true} key="add" render={(props) => <AddRecord {...props} currentUser={currentUser} />} />
          <Route path='/edit/:id' exact={true} key="edit" render={(props) => <AddRecord {...props} currentUser={currentUser} />} />

          <Route path='/currency-rates' exact={true} component={CurrencyRates} />
          <Route path='*' exact={true} component={PageNotFound} />
        </Switch>

        <PageFooter />
      </ BrowserRouter>
    </div>
  );
}