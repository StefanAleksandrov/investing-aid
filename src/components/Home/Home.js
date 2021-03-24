import { useState, useEffect } from 'react';

import './Home.scss';

export default function Home() {
    let returnValue = '';
    const [logged, setLogged] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLogged((prev) => !prev);
        }, 2000)
    }, []);

    if (logged) {
        returnValue = (
            <main className='page-container home'>
                <h1 className="main-title">HODL!</h1>
            </main>
        );

    } else {
        returnValue = (
            <main className='page-container home'>
                <h1 className="main-title">I like the <span className='yellow'>STONK!</span></h1>
            </main>
        );
    }

    return returnValue;
}