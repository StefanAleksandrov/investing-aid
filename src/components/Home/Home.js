import { useState, useEffect } from 'react';

import './Home.scss';

export default function Home() {
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        setLogged((prev) => !prev);
    }, []);

    return (
        <main className='page-container home'>
            <h1 className="main-title">{logged ? "I like the STONK!" : "HODL!" }</h1>
        </main>
    );
}