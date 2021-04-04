import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getAll } from '../../services/stockService.js';
import './Profile.scss';

export default function Profile({
    currentUser
}) {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const uid = currentUser?.uid || '';

        if (!uid) return;

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
                }
            })
            .catch(console.log);
    }, [currentUser.uid]);

    return (
        <div className="page-container">
            <h1 className="main-heading" >Your Investment records</h1>

            <table className="stocks" >
                <thead className="heading" >
                    <tr>
                        <th className="cell" >№</th>
                        <th className="cell" >Stock</th>
                        <th className="cell" >Amount</th>
                        <th className="cell" >Bought date</th>
                        <th className="cell" >Price</th>
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
                                    <td className="cell" >{record.price}</td>
                                    <td className="cell btn" >Edit</td>
                                    <td className="cell btn" >&times;</td>
                                </tr>
                            )
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