import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getAll } from '../../services/stockService.js';
import './Profile.scss';

export default function Profile({ history }) {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const uid = localStorage.getItem('user');

        if (!uid) history.push('/');

        getAll(uid)
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
                    console.log(records);
                }
            })
            .catch(console.log);
    }, []);

    return (
        <div className="page-container container">
            <h1>Your Investment records</h1>

            <table>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Stock</th>
                        <th>Amount</th>
                        <th>Bought date</th>
                        <th>Price</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        records.map((record, index) => {
                            console.log(index);
                            return (<tr>
                                <td>{index + 1}</td>
                                <td>{record.stock}</td>
                                <td>{record.amount}</td>
                                <td>{record.createdAt}</td>
                                <td>{record.price}</td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>

            {
                records.length < 1
                    ? <h3>No records yet. <Link to='/add-record'>Add one</Link> now!</h3>
                    : ''
            }
        </div>
    )
}