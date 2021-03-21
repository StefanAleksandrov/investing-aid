import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

//Components
import PageHeader from './components/Header/Header'
import PageFooter from './components/Footer/Footer'
import Home from './components/Home/Home'
import AboutUs from './components/AboutUs/AboutUs'
import ContactUs from './components/Contacts/Contacts'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <PageHeader />

        <Switch>
          <Route path='/' exact={true} >{Home}</Route>
          <Route path='/about-us' exact={true} >{AboutUs}</Route>
          <Route path='/contact-us' exact={true} >{ContactUs}</Route>
          <Route path='/sign-up' exact={true} >{SignUp}</Route>
          <Route path='/sign-in' exact={true} >{SignIn}</Route>
        </Switch>

        <PageFooter />
      </ BrowserRouter>
    </div>
  );
}