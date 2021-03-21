import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

//Components
import Header from './components/Header/Header';
import PageFooter from './components/Footer/Footer';
import Home from './components/Home/Home';
import AboutUs from './components/AboutUs/AboutUs';
import ContactUs from './components/Contacts/Contacts';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/about-us' exact={true} component={AboutUs}/>
          <Route path='/contact-us' exact={true} component={ContactUs}/>
          <Route path='/sign-up' exact={true} component={SignUp}/>
          <Route path='/sign-in' exact={true} component={SignIn}/>
        </Switch>

        <PageFooter />
      </ BrowserRouter>
    </div>
  );
}