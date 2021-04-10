import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { getAll, deleteByID } from '../../services/stockService.js';
import AuthContext from '../../contexts/AuthContext';
import './MyInvestments.scss';

export default function MyInvestments({ history }) {
    const currentUser = useContext(AuthContext)[0];

    const [currency, setCurrency] = useState("USD");
    const [records, setRecords] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (!currentUser.uid) return;

        getAll(currentUser.uid)
            .then(data => {
                if (data) {
                    let arr = [];

                    for (const key in data) {
                        if (Object.hasOwnProperty.call(data, key)) {
                            data[key].id = key;
                            arr.push(data[key]);
                        }
                    }

                    arr.sort((a, b) => a.stock.localeCompare(b.stock));
                    setRecords([...arr]);
                }
            })
            .catch(console.log);
    }, [currentUser.uid]);

    useEffect(() => {
        setTotalPrice(() => {
            return records.reduce((acc, current) => {
                return acc + (current.prices[currency] * current.amount);
            }, 0);
        })
    }, [records, currency]);

    function editEntryHandler(e, id) {
        e.preventDefault();
        history.push(`/edit/${id}`);
    }

    function deleteEntryHandler(e, id) {
        e.preventDefault();

        if (!window.confirm("Are you sure?")) return;

        if (!currentUser.uid) return;

        deleteByID(currentUser.uid, id)
            .then(resp => {
                if (resp.statusText === "OK") {
                    let newRecords = records.filter(record => {
                        return record.id !== id;
                    })

                    setRecords(newRecords);
                }
            })
    }

    return (
        <div className="page-container">
            { records.length < 1
                    ? <h1 className="main-heading" >No records yet. <Link to='/add-record'>Add one</Link> now!</h1>
                    : (
                        <>
                            <h1 className="main-heading" >Your Investment records</h1>

                            <table className="stocks" >
                                <thead className="heading" >
                                    <tr>
                                        <th className="cell" >№</th>
                                        <th className="cell" >Stock</th>
                                        <th className="cell" >Amount</th>
                                        <th className="cell" >Bought date</th>
                                        <th className="cell" >Bought at</th>
                                        <th className="cell" >Total</th>
                                        <th className="cell" >Current price</th>
                                        <th className="cell" >Gain / Loss</th>
                                        <th className="cell" >Edit</th>
                                        <th className="cell" >Delete</th>
                                    </tr>
                                </thead>

                                <tbody className="body" >
                                    {
                                        records.map((record, index) => {
                                            return (
                                                <tr key={record.id} className="line" >
                                                    <td className="cell" >{index + 1}</td>
                                                    <td className="cell" >{record.stock}</td>
                                                    <td className="cell" >{record.amount}</td>
                                                    <td className="cell" >{record.createdAt.split("T")[0]}</td>
                                                    <td className="cell" >{Number(record.prices[currency]).toFixed(2)} {currency}</td>
                                                    <td className="cell" >{Number(record.prices[currency] * record.amount).toFixed(2)} {currency}</td>
                                                    <td className="cell" >--.-- {currency}</td>
                                                    <td className="cell" >--.-- %</td>
                                                    <td className="cell btn" >
                                                        <svg onClick={event => editEntryHandler(event, record.id)} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen-square" className="svg-inline--fa fa-pen-square fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 480H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zM238.1 177.9L102.4 313.6l-6.3 57.1c-.8 7.6 5.6 14.1 13.3 13.3l57.1-6.3L302.2 242c2.3-2.3 2.3-6.1 0-8.5L246.7 178c-2.5-2.4-6.3-2.4-8.6-.1zM345 165.1L314.9 135c-9.4-9.4-24.6-9.4-33.9 0l-23.1 23.1c-2.3 2.3-2.3 6.1 0 8.5l55.5 55.5c2.3 2.3 6.1 2.3 8.5 0L345 199c9.3-9.3 9.3-24.5 0-33.9z"></path></svg>
                                                    </td>
                                                    <td className="cell btn" >
                                                        <svg onClick={event => deleteEntryHandler(event, record.id)} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" className="svg-inline--fa fa-trash fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path></svg>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>

                                <tfoot className="foot" >
                                    <tr className="line" >
                                        <td className="cell" ></td>
                                        <td className="cell" ></td>
                                        <td className="cell" ></td>
                                        <td className="cell" ></td>
                                        <td className="cell" >Sum:</td>
                                        <td className="cell" >{totalPrice.toFixed(2)} {currency}</td>
                                        <td className="cell" >--.-- {currency}</td>
                                        <td className="cell" >--.-- %</td>
                                        <td className="cell" >Currency:</td>
                                        <td className="cell" >
                                            <select className="select-currency" value={currency.toLowerCase()} onChange={(event) => setCurrency(event.target.value.toUpperCase())} >
                                                <option value="usd">USD</option>
                                                <option value="eur">EUR</option>
                                                <option value="bgn">BGN</option>
                                            </select>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </> )
            }
        </div>
    )
}