import React, { Component } from 'react';
import PropTypes, { nominalTypeHack } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

function EditableTableCell(props) {
  const { editable, cellname, children, ...opts } = props;
  const value = children;
  if (editable) {
    // TODO: create css class for input.
    return (
      <EditContext.Consumer>
        {({ handleInputChange }) => {
          return (
            <TableCell {...opts}>
              <div>
                <input type="text" className="" defaultValue={value} name={cellname} onChange={handleInputChange}/>
              </div>
            </TableCell>
          );
        }}
      </EditContext.Consumer>
    );
  }
  return (
    <TableCell {...opts}>{value}</TableCell>
  );
}

const EditContext = React.createContext({
  editable: false,
  changeEditableState: () => {},
});

// TODO: render a edit/save/remove buttons, that alters the editable state of the EditableCell
function EditButton(props) {

  if (props.editable) {
    const save = 'Save';
    const cancel = 'Cancel';
    return (
      <EditContext.Consumer>
        {({ saveEdition, cancelEdition }) => (
          <div>
            <button onClick={saveEdition}>{save}</button>
            <button onClick={cancelEdition}>{cancel}</button>
          </div>
        )}
      </EditContext.Consumer>
    );
  } else {
    const edit = 'Edit';
    return (
      <EditContext.Consumer>
        {({ changeEditableState }) => (
          <div>
            <button onClick={changeEditableState}>{edit}</button>
          </div>
        )}
      </EditContext.Consumer>
    );
  }
}

function Content(props) {
  let row = props.data.row;
  let classes = props.classes;
  let editable = props.editable;
  return (
    <TableRow key={row.id}>
      <EditableTableCell className={classes.tablecell} editable={editable} cellname="name" component="th" scope="row">{row["name"]}</EditableTableCell>
      <EditableTableCell className={classes.tablecell} editable={editable} cellname="code" numeric>{row["code"]}</EditableTableCell>
      <EditableTableCell className={classes.tablecell} editable={editable} cellname="price" numeric>{row["price"]}</EditableTableCell>
      <EditableTableCell className={classes.tablecell} editable={editable} cellname="quantity" numeric>{row["quantity"]}</EditableTableCell>
      <EditableTableCell className={classes.tablecell} editable={editable} cellname="description">{row["description"]}</EditableTableCell>
      <TableCell><EditButton editable={editable}/></TableCell>
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

    // const row = { id: 1, name: 'Caixa', code: 123, price: 350.0, quantity: 1, description: 'Caixa de bateria Adah.' };
    this.state = {
      classes: props.classes,
      data: {
        row: props.row,
        savedRow: props.row,
        originalRow: props.row,
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
    this.setState(state => (state));
  };

  cancelEdition() {
    this.setState(state => (state));
  };

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState(state => {
      state.data.row[name] = value;
      return state;
    });
  };

  changeEditableState() {
    this.setState(state => ({
      editable: state.editable ? false : true,
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
    return (
      <EditContext.Provider value={this.state}>
        <button onClick={this.change}> change state</button>
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