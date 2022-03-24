import React from 'react';
import moment from 'moment';
import 'moment/locale/es';

const BalanceList = ({balance, setBalance, balances, setListUpdated}) => {


    const handleDelete = id => {
        const requestInit = {
            method: 'DELETE'
        }
        fetch('http://localhost:9000/api/' + id, requestInit)
        .then(res => res.text())
        .then(res => console.log(res))

        setListUpdated(true)
    }

    let{concept, amount, date} = balance
    
    
    balances = balances.slice(balances.length-10)
    const handleUpdate = id => {
        amount = parseInt(amount, 10)
        let newBalance = {
            'concept':balance.concept,
            'amount':balance.amount,
            'date':balance.date
        }
        //validación de los datos
        if (concept === '' || date === '' || amount <= 0) {
            alert('Todos los campos son obligatorios')
            return
        }
        const requestInit = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newBalance)
        }
        fetch('http://localhost:9000/api/' + id, requestInit)
        .then(res => res.text())
        .then(res => console.log(res))

        //reiniciando state de libro
        setBalance({
            concept: '',
            amount: 0,
            date: ''
        })

        setListUpdated(true)
    }

    moment.locale('es');
    return (
        <div className="table-wrapper-scroll-y my-custom-scrollbar">
        <table className="table table-dark table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Concepto</th>
                    <th>Monto</th>
                    <th>Fecha</th>
                    <th>Tipo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {balances.map(balance => (
                    <tr key={balance.id}>
                        <td>{balance.id}</td>
                        <td>{balance.concept}</td>
                        <td>{balance.amount}</td>
                        <td>{moment(balance.date).format('L')}</td>
                        <td>{balance.type}</td>
                        <td>
                            <div className="row mb-3">
                                <div className="col-3">
                                <button onClick={() => handleDelete(balance.id)} className="btn btn-danger">Delete</button>
                                </div>
                                <div className="col-3">
                                <button onClick={() => handleUpdate(balance.id)} className="btn btn-dark">Update</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
}
 
export default BalanceList;