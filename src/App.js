import React, { Component } from 'react';
import './App.css';
import RegisterTable from './components/Table';

let id = 0;
function createData(name, code, price, quantity, description) {
    id += 1;
    return { id, name, code, price, quantity, description }
}

const rows = [
    createData('Caixa', 123, 350.0, 1, 'Caixa de bateria Adah.'),
    createData('Prato', 124, 300.0, 1, 'Prato Zyldian B20 com rachadura reformada.'),
    createData('Bumbo', 789, 400, 2, 'Bumbo LilliPaul'),
    createData('Baqueta', 42, 30, 12, 'Baqueta Liverpool')
];

class App extends Component {
  render() {
    // <Row row={rows[0]}/>
    return (
      <div className="App">
        <RegisterTable rows={rows}/>
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
