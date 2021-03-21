import { useState, useEffect } from 'react';

import './Home.scss';

export default function Home() {
    // const [counter, setCounter] = useState(0);

    function increment() {
        // setCounter((prev) => prev + 1);
    }

    return (
        <main className='page-container home'>
            <h1>I like the stock!</h1>
            {/* <p>{counter}</p> */}
            {/* <button onClick={increment}>Increment</button> */}
        </main>
    );
}