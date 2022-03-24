import React, {Fragment, useState, useEffect} from 'react';
import Navbar from './Components/Navbar'
import BalanceList from './Components/BalanceList'
import Form from './Components/Form'
import BalanceTotal from './Components/Balancetotal';

function App() {

  const [balance, setBalance] = useState({

    concept: '',
    amount: 0,
    date: ''
  })

  const [balances, setBalances] = useState([])

  const [listUpdated, setListUpdated] = useState(false)

  useEffect(() => {
    const getBalances = () => {
      fetch('http://localhost:9000/api')
      .then(res => res.json())
      .then(res => setBalances(res))
    }
    getBalances()
    setListUpdated(false)
  }, [listUpdated])

  return (
    <Fragment>
      <Navbar brand='Balance'/>
      <div className="container"> 
        <div className="row ">
          <div className="col-7 mt-5">
            <div className="row justify-content-center">
              <div className="col-8">
                <h2 className='mb-5' style={{textAlign:'center'}} id="title-bal">Balance</h2>
              </div>
            </div>
            <div className="row align-items-center" style={{height:'65%'}}>
              <div className="col-12">
                <BalanceTotal balances={balances} />
              </div>
            </div>
          </div>
          <div className="col-5 mt-5">
            <div className="row justify-content-center">
              <div className="col-8 mb-3">
                <h2 style={{textAlign: 'center'}} id="title-form">Formulario</h2>
              </div>
            </div>
            <Form balance={balance} setBalance={setBalance}/>
          </div>
          <div className="col-12 justify-content-center mt-5">
            <div className="row justify-content-center mb-3">
              <div className="col-5">
                <h2 style={{textAlign: 'center'}} id="title-ulm">Ultimos movimientos</h2>
              </div>
            </div>
            <BalanceList balance={balance} setBalance={setBalance} balances={balances} setListUpdated={setListUpdated}/>
          </div>
          
        </div>
      </div>
    </Fragment>
  );
}


export default App;
