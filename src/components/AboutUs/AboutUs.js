import { Link } from 'react-router-dom';

import './AboutUs.scss';
import AboutUsImg from '../../images/about-us.jpg';

export default function Home() {
    return (
        <main className='page-container about-us'>
            <div className="container">
                <img src={AboutUsImg} width="700px" height="500px" alt="About Us" />

                <div className="information">
                    <h1>About Us Page</h1>
                    <p>This web app is about helping investors keep track of their finances. If you trade with stocks, bonds, crypto or anything else in a currency different than the currency in your country and want to keep exact track of your finances, this is the site for you!</p>
                    <p>You want to know exactly how much your invested money changed- what is your gain or loss? <Link to='/sign-up' >Sign up</Link> now and keep track of your money!</p>
                    <p>Already have an account? <Link to='/sign-in' >Sign in</Link> with it and update your information!</p>
                </div>
            </div>
        </main>
    )
}