import { useState, useEffect } from 'react';

import { getCurrencies } from '../../services/stockService';
import './CurrencyRates.scss';

export default function CurrencyRates() {
    const [baseCurrency, setBaseCurrency] = useState('eur');
    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {
        getCurrencies()
            .then(resp => resp.json())
            .then(data => {
                const arr = [];

                for (const key in data.rates) {
                    if (Object.hasOwnProperty.call(data.rates, key)) {
                        arr.push({ currency: key, rate: data.rates[key] });
                    }
                }

                setCurrencies(arr);
            })
            .catch(console.log);
    }, []);

    useEffect(() => {
        const baseCurrencyRate = currencies.find(curr => curr.currency.toLowerCase() === baseCurrency)?.rate;

        if (baseCurrency) {
            setCurrencies(currencies.map(x => {
                x.rate = Number(x.rate) / Number(baseCurrencyRate);
                return x;
            }));
        }
    }, [baseCurrency])

    function changeBaseCurrencyHandler(e) {
        e.preventDefault();

        setBaseCurrency(e.target.value);
    }

    return (
        <div className="page-container currencies">
            <h1 className="main-heading" >Currency Rates</h1>

            <article className="base-currency">
                <label htmlFor="currency">Base Currency: </label>
                <select name="currency" id="currency" value={baseCurrency} onChange={changeBaseCurrencyHandler} >
                    <option value="bgn">BGN</option>
                    <option value="eur">EUR</option>
                    <option value="usd">USD</option>
                </select>
            </article>

            <ul className="currenciesList" >
                {
                    currencies.map(x => {
                        return <li className="item" key={x.currency} >{x.currency}: <span>{x.rate.toFixed(2)}</span></li>
                    })
                }
            </ul>

        </div>
    )
}