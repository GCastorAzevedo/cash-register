import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    tablecell: {
        fontSize: '14pt'
    }
});

class EditableTableCell extends Component {
    constructor(props) {
        super(props);
        const { editable, children, ...opts} = props;
        this.state = {
            editable: editable,
            value: children,
            opts: opts
        }
    }

    render() {
        const editable = this.state.editable;
        const opts = this.state.opts;
        const value = this.state.value;
        // TODO: add class to input!
        if (editable) {
            return (
                <TableCell {...opts}>
                    <input type="text" className="form-control" defaultValue={value} />
                </TableCell>
            );
        }
        return (
            <TableCell {...opts}>{value}</TableCell>
        );
    }
}

// TODO: render a edit/save/remove buttons, that alters the editable state of the EditableCell
// from false to true.
class Edit extends Component {
    render() {
        return (
            <div>
                <button>Edit</button>
                <button>Save</button>
            </div>
        );
    }
}

class RegisterTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            data: {
                rows: props.rows
            }
        }

    }

    render() {
        const classes = this.props.classes;
        const rows = this.state.data.rows;
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tablecell}>Product</TableCell>
                            <TableCell className={classes.tablecell} numeric>Code</TableCell>
                            <TableCell className={classes.tablecell} numeric>Price</TableCell>
                            <TableCell className={classes.tablecell} numeric>Quantity</TableCell>
                            <TableCell className={classes.tablecell}>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map( (row, i) => {
                            return (
                                <TableRow key={row.id}>
                                    <TableCell className={classes.tablecell} component="th" scope="row">{row.name}</TableCell>
                                    <TableCell className={classes.tablecell} numeric>{row.code}</TableCell>
                                    <EditableTableCell className={classes.tablecell} numeric editable={true}>{row.price}</EditableTableCell>
                                    <TableCell className={classes.tablecell} numeric>{row.quantity}</TableCell>
                                    <TableCell className={classes.tablecell}>{row.description}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

RegisterTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegisterTable);

/*




// Make sure the shape of the default value passed to
// createContext matches the shape that the consumers expect!
export const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {},
});




import {ThemeContext} from './theme-context';

function ThemeTogglerButton() {
  // The Theme Toggler Button receives not only the theme
  // but also a toggleTheme function from the context
  return (
    <ThemeContext.Consumer>
      {({theme, toggleTheme}) => (
        <button
          onClick={toggleTheme}
          style={{backgroundColor: theme.background}}>
          Toggle Theme
        </button>
      )}
    </ThemeContext.Consumer>
  );
}

export default ThemeTogglerButton;




import {ThemeContext, themes} from './theme-context';
import ThemeTogglerButton from './theme-toggler-button';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };

    // State also contains the updater function so it will
    // be passed down into the context provider
    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme,
    };
  }

  render() {
    // The entire state is passed to the provider
    return (
      <ThemeContext.Provider value={this.state}>
        <Content />
      </ThemeContext.Provider>
    );
  }
}

function Content() {
  return (
    <div>
      <ThemeTogglerButton />
    </div>
  );
}

ReactDOM.render(<App />, document.root);




*/

/*
class Products extends React.Component {

    constructor(props) {
      super(props);
  
      //  this.state.products = [];
      this.state = {};
      this.state.filterText = "";
      this.state.products = [
        {
          id: 1,
          category: 'Sporting Goods',
          price: '49.99',
          qty: 12,
          name: 'football'
        }, {
          id: 2,
          category: 'Sporting Goods',
          price: '9.99',
          qty: 15,
          name: 'baseball'
        }, {
          id: 3,
          category: 'Sporting Goods',
          price: '29.99',
          qty: 14,
          name: 'basketball'
        }, {
          id: 4,
          category: 'Electronics',
          price: '99.99',
          qty: 34,
          name: 'iPod Touch'
        }, {
          id: 5,
          category: 'Electronics',
          price: '399.99',
          qty: 12,
          name: 'iPhone 5'
        }, {
          id: 6,
          category: 'Electronics',
          price: '199.99',
          qty: 23,
          name: 'nexus 7'
        }
      ];
  
    }
    handleUserInput(filterText) {
      this.setState({filterText: filterText});
    };
    handleRowDel(product) {
      var index = this.state.products.indexOf(product);
      this.state.products.splice(index, 1);
      this.setState(this.state.products);
    };
  
    handleAddEvent(evt) {
      var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
      var product = {
        id: id,
        name: "",
        price: "",
        category: "",
        qty: 0
      }
      this.state.products.push(product);
      this.setState(this.state.products);
  
    }
  
    handleProductTable(evt) {
      var item = {
        id: evt.target.id,
        name: evt.target.name,
        value: evt.target.value
      };
  var products = this.state.products.slice();
    var newProducts = products.map(function(product) {
  
      for (var key in product) {
        if (key == item.name && product.id == item.id) {
          product[key] = item.value;
  
        }
      }
      return product;
    });
      this.setState({products:newProducts});
    //  console.log(this.state.products);
    };
    render() {
  
      return (
        <div>
          <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)}/>
          <ProductTable onProductTableUpdate={this.handleProductTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} products={this.state.products} filterText={this.state.filterText}/>
        </div>
      );
  
    }
  
  }
  class SearchBar extends React.Component {
    handleChange() {
      this.props.onUserInput(this.refs.filterTextInput.value);
    }
    render() {
      return (
        <div>
  
          <input type="text" placeholder="Search..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange.bind(this)}/>
  
        </div>
  
      );
    }
  
  }
  
  class ProductTable extends React.Component {
  
    render() {
      var onProductTableUpdate = this.props.onProductTableUpdate;
      var rowDel = this.props.onRowDel;
      var filterText = this.props.filterText;
      var product = this.props.products.map(function(product) {
        if (product.name.indexOf(filterText) === -1) {
          return;
        }
        return (<ProductRow onProductTableUpdate={onProductTableUpdate} product={product} onDelEvent={rowDel.bind(this)} key={product.id}/>)
      });
      return (
        <div>
  
  
        <button type="button" onClick={this.props.onRowAdd} className="btn btn-success pull-right">Add</button>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>price</th>
                <th>quantity</th>
                <th>category</th>
              </tr>
            </thead>
  
            <tbody>
              {product}
  
            </tbody>
  
          </table>
        </div>
      );
  
    }
  
  }
  
  class ProductRow extends React.Component {
    onDelEvent() {
      this.props.onDelEvent(this.props.product);
  
    }
    render() {
  
      return (
        <tr className="eachRow">
          <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
            "type": "name",
            value: this.props.product.name,
            id: this.props.product.id
          }}/>
          <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
            type: "price",
            value: this.props.product.price,
            id: this.props.product.id
          }}/>
          <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
            type: "qty",
            value: this.props.product.qty,
            id: this.props.product.id
          }}/>
          <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
            type: "category",
            value: this.props.product.category,
            id: this.props.product.id
          }}/>
          <td className="del-cell">
            <input type="button" onClick={this.onDelEvent.bind(this)} value="X" className="del-btn"/>
          </td>
        </tr>
      );
  
    }
  
  }
  class EditableCell extends React.Component {
  
    render() {
      return (
        <td>
          <input type='text' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onProductTableUpdate}/>
        </td>
      );
  
    }
  
  }
  ReactDOM.render( < Products / > , document.getElementById('container'));
  
  */
  