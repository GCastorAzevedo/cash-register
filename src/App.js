import React, { Component } from 'react';
import './App.css';
import RegisterTable from './components/Register/Table';
import Row from './components/Row/Row';

let id = 0;
function createData(name, code, price, quantity, description) {
    id += 1;
    return { id, name, code, price, quantity, description }
}

const rows = [
    createData('Caixa', 123, 350.0, 1, 'Caixa de bateria Adah.'),
    createData('Prato', 124, 300.0, 1, 'Prato Zyldian B20 com rachadura reformada.')
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <Row row={rows[0]}/>
      </div>
    );
    /*
    return (
      <div className="App">
        <RegisterTable rows={rows}/>
      </div>
    );
    */
  }
}

export default App;
