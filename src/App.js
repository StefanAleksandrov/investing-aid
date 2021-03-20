import { Route, Switch } from 'react-router-dom'
import './App.css';

import PageHeader from './Header/Header'
import PageFooter from './Footer/Footer'
import Home from './Home/Home'
import AboutUs from './AboutUs/AboutUs'

function App() {
  return (
    <div className="App">
      <PageHeader />

      <Switch>
        <Route path='/' exact={true} >{Home}</Route>
        <Route path='/about-us' exact={true} >{AboutUs}</Route>
      </Switch>

      <PageFooter />
    </div>
  );
}

export default App;