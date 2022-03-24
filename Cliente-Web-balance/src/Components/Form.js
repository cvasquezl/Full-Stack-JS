import React from 'react';

const Form = ({balance, setBalance}) => {

    const handleChange = e => {
        setBalance({
            ...balance,
            [e.target.name]: e.target.value
        })
    }

    let{concept, amount, date, type} = balance

    const handleSubmit = () => {
        amount = parseInt(amount, 10)
        //validación de los datos
        if (concept === '' || date === '' || amount <= 0 || type === '' ) {
            alert('Todos los campos son obligatorios')
            return
        }

        //consulta
        const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(balance)
        }
        fetch('http://localhost:9000/api', requestInit)
        .then(res => res.text())
        .then(res => console.log(res))

        //reiniciando state de libro
        setBalance({
            concept: '',
            amount: 0,
            date: '',
            type:''
        })



    }

    return ( 
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="concept" className="form-label">Concepto</label>
                <input value={concept} name="concept" onChange={handleChange} type="text" id="concept" className="form-control"/>
            </div>
            <label htmlFor="amount" className="form-label">Monto</label>
            <div className="input-group mb-3">
                <span className="input-group-text">$</span>
                <input value={amount} name="amount" onChange={handleChange} type="number" id="amount" className="form-control"/>
            </div>
            <div className="mb-3">
                <label htmlFor="date" className="form-label">Fecha</label>
                <input value={date}  name="date" onChange={handleChange} type="date" id="date" className="form-control"/>
            </div>
            <div className="mb-3">
                <label htmlFor="type" className="form-label">Tipo</label>
                <select value={type}  name="type" onChange={handleChange} type="string" id="type" className="form-control">
                    <option value={''}>Seleccione...</option>
                    <option value={'ingreso'}>Ingreso</option>
                    <option value={'egreso'}>Egreso</option>
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}
 
export default Form;