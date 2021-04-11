import { useContext, useEffect, useState } from 'react';

import { getUsername } from '../../services/authService';
import { getAll } from '../../services/stockService';
import AuthContext from '../../contexts/AuthContext';
import NotificationContext from '../../contexts/NotificationContext';
import './Profile.scss';

export default function Profile () {
    const currentUser = useContext(AuthContext)[0];
    const dispatch = useContext(NotificationContext)[1];

    const [joinDate, setJoinDate] = useState('');

    useEffect(() => {
        getUsername(currentUser.uid)
            .then(data => {
                if (data.joined) {
                    let date = data.joined.split("T")[0];
                    setJoinDate(date);
                }
            })
            .catch(err => dispatch({ message: err.message, type: 'error', action: 'NOTIFY'}) );
    }, [currentUser.uid, dispatch]);

    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        getAll(currentUser.uid)
            .then(data => {
                let amountStocks = 0;
                let amountCompanies = 0;
                let amountMoney = 0;

                for (const key in data) {
                    if (Object.hasOwnProperty.call(data, key)) {
                        amountStocks += Number(data[key].amount);
                        amountCompanies += 1;
                        amountMoney += (Number(data[key].prices.USD) * Number(data[key].amount));
                    }
                }

                const averageStocksCompany = (amountStocks / amountCompanies).toFixed(2);
                const averageStockPrice = (amountMoney / amountStocks).toFixed(2);

                setStocks(() => ({
                    amountStocks,
                    amountCompanies,
                    amountMoney,
                    averageStocksCompany,
                    averageStockPrice
                }));
            })
            .catch(err => dispatch({ message: err.message, type: 'error', action: 'NOTIFY'}) );
    }, [currentUser.uid, dispatch]);

    return (
        <div className="page-container">
            <h1 className="main-heading">{currentUser.username}
                <p className="subheading" >Join date: <span className="bold">{joinDate}</span></p>
            </h1>

            <div className="container">
                <div className="col-50">
                    <p>Total number of stocks: <span className="bold" >{stocks.amountStocks}</span></p>
                    <p>Total number of companies: <span className="bold" >{stocks.amountCompanies}</span></p>
                    <p>Total amount of money invested: <span className="bold" >{stocks.amountMoney?.toFixed(2)} USD</span></p>
                </div>

                <div className="col-50">
                    <p>Average number of stocks in a company: <span className="bold" >{stocks.averageStocksCompany !== "NaN" ? stocks.averageStocksCompany : 0}</span></p>
                    <p>Average price per stock: <span className="bold" >{stocks.averageStockPrice !== 'NaN' ? stocks.averageStockPrice : 0} USD</span></p>
                </div>
            </div>
        </div>
    );
}