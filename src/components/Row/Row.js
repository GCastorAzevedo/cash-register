import React, { Component } from 'react';
import PropTypes, { nominalTypeHack } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Create from '@material-ui/icons/Create';
import Clear from '@material-ui/icons/Clear';
import Save from '@material-ui/icons/Save';
import Add from '@material-ui/icons/Add';
import './Row.css';

function EditableTableCell(props) {
  const { editable, cellname, children, classes, ...opts } = props;
  const value = children;
  if (editable) {
    // TODO: create css class for input.
    return (
      <EditContext.Consumer>
        {({ handleInputChange }) => {
          // className={props.classes.tablecellinput}
          return (
            <TableCell className={classes.tablecell} {...opts}>
                <input className="jss196" type="text" defaultValue={value} name={cellname} onChange={handleInputChange}/>
            </TableCell>
          );
        }}
      </EditContext.Consumer>
    );
  }
  return (
    <TableCell className={classes.tablecell} {...opts}>{value}</TableCell>
  );
}

const EditContext = React.createContext({
  editable: false,
  changeEditableState: () => {},
});

// TODO: render a edit/save/remove buttons, that alters the editable state of the EditableCell
// TODO: create css class for EditButton
function EditButton(props) {

  if (props.editable) {
    // className={props.classes.editbutton}
    return (
      <EditContext.Consumer>
        {({ saveEdition, cancelEdition }) => (
          <table>
            <tbody>
              <tr>
                <td>
                  <button onClick={saveEdition}>
                    <Save />
                  </button>
                  <button onClick={cancelEdition}>
                    <Clear />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </EditContext.Consumer>
    );
  } else {
    return (
      <EditContext.Consumer>
        {({ changeEditableState }) => (
          <table>
            <tbody>
              <tr>
                <td>
                  <button onClick={changeEditableState}><Create /></button>
                  <button><DeleteForever /></button>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </EditContext.Consumer>
    );
  }
}

function Content(props) {
  let row = props.data.currentRow;
  let classes = props.classes;
  let editable = props.editable;
  // TODO: implement a loop inside TableRow for adding variable number of cells.
  return (
    <TableRow key={row.id}>
      <EditableTableCell editable={editable} classes={classes} cellname="name" component="th" scope="row">{row["name"]}</EditableTableCell>
      <EditableTableCell editable={editable} classes={classes} cellname="code">{row["code"]}</EditableTableCell>
      <EditableTableCell editable={editable} classes={classes} cellname="price" numeric>{row["price"]}</EditableTableCell>
      <EditableTableCell editable={editable} classes={classes} cellname="quantity" numeric>{row["quantity"]}</EditableTableCell>
      <EditableTableCell editable={editable} classes={classes} cellname="description">{row["description"]}</EditableTableCell>
      <TableCell><EditButton editable={editable} classes={classes}/></TableCell>
    </TableRow>
  );
}

// Container - handles cells states, which are modified by child elements through the Edit button
class Row extends Component {
  constructor(props) {
    super(props);
    // TODO: what should edit and cancel do ?
    this.saveEdition = this.saveEdition.bind(this);
    this.cancelEdition = this.cancelEdition.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.changeEditableState = this.changeEditableState.bind(this);
    // TODO: delete this.
    this.change = this.change.bind(this);

    // TODO: delete this.
    // const row = { id: 1, name: 'Caixa', code: 123, price: 350.0, quantity: 1, description: 'Caixa de bateria Adah.' };
    this.state = {
      classes: props.classes,
      data: {
        originalRow: Object.assign({}, props.row),
        currentRow: props.row,
      },
      editable: false,
      saveEdition: this.saveEdition,
      cancelEdition: this.cancelEdition,
      handleInputChange: this.handleInputChange,
      changeEditableState: this.changeEditableState,
    }
  }

  // TODO: what should edit and cancel do ?
  saveEdition() {
    this.setState(prevState => {
      const newRow = prevState.data.currentRow;
      const newData = {
        currentRow: newRow,
        originalRow: newRow
      };
      const editableStatus = !prevState.editable;
      return {
        data: newData,
        editable: editableStatus
      }
    });
  };

  cancelEdition() {
    this.setState(prevState => {
      const oldRow = prevState.data.oldRow;
      const oldData = {
        currentRow: oldRow,
        originalRow: oldRow
      }
      const editableStatus = !prevState.editable;

      return {
        data: oldData,
        editable: editableStatus
      }
    });
  };

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState((prevState, props) => {
      const oldRow = prevState.data.originalRow;
      const newRow = prevState.data.currentRow;
      newRow[name] = Number(value);

      const data = {
        currentRow: newRow,
        originalRow: oldRow,
      }
      return {
        data: data
      };
    });
  };

  changeEditableState() {
    this.setState(state => ({
      editable: !state.editable,
    }));
  };

  // TODO: delete this.
  change() {
    this.setState(state => {
      state.editable = !state.editable;
      state.data.savedRow = Math.floor(Math.random() * 10);
      return state;
    });
  }

  componentDidUpdate() {
    // TODO: delete this!
    console.log(' \n\n -+-+-+-+-+-+-+-+-+-+ \n\n ', this.state);
  }

  render() {
    const data = this.state.data;
    const classes = this.state.classes;
    const editable = this.state.editable;
    // TODO: delete the change state button
    // <button onClick={this.change}> change state</button>
    return (
      <EditContext.Provider value={this.state}>
        <Content data={data} classes={classes} editable={editable}/>
      </EditContext.Provider>
    );
  }
}

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

export default withStyles(styles)(Row);