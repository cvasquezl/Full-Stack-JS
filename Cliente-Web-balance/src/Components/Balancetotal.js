import React from "react";


const balances = ({balances})=>{


    let egresos = balances.filter( egreso => egreso.type === 'egreso').map(egreso => egreso.amount).reduce((a, b) => a+=b,0);
    let ingresos = balances.filter( ingreso => ingreso.type === 'ingreso').map(ingreso => ingreso.amount).reduce((a, b) => a+=b,0);
    let formatter = Intl.NumberFormat('es-CL', {
        style:'currency',
        currency:'CLP',
        minimumFractionDigits:0
    });
    let formatIngresos = formatter.format(ingresos); 
    let formatEgresos = formatter.format(egresos);

    return(
        <div className="container">
            <div className="row justify-content-around ">
                <div className="card text-white mb-3 " style={{maxWidth: '18rem'}} id="card1">
                    <div className="card-header">ingresos</div>
                    <div className="card-body text-center">
                        <h1>{formatIngresos}</h1>
                    </div>    
                </div>
                <div className="card text-white mb-3 " style={{maxWidth: '18rem'}} id="card2">
                    <div className="card-header ">egresos</div>
                    <div className="card-body text-center">
                        <h1>{formatEgresos}</h1>
                    </div>    
                </div>
            </div>

        </div>
    )
};


export default balances;