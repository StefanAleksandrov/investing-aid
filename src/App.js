import { Route, Switch } from 'react-router-dom'
import './App.css';

import PageHeader from './Header/Header'
import PageFooter from './Footer/Footer'
import Home from './Home/Home'
import AboutUs from './AboutUs/AboutUs'
import ContactUs from './Contacts/Contacts'
import SignUp from './SignUp/SignUp'
import SignIn from './SignIn/SignIn'

function App() {
  return (
    <div className="App">
      <PageHeader />

      <Switch>
        <Route path='/' exact={true} >{Home}</Route>
        <Route path='/about-us' exact={true} >{AboutUs}</Route>
        <Route path='/contact-us' exact={true} >{ContactUs}</Route>
        <Route path='/sign-up' exact={true} >{SignUp}</Route>
        <Route path='/sign-in' exact={true} >{SignIn}</Route>
      </Switch>

      <PageFooter />
    </div>
  );
}

export default App;