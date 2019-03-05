import React, { Component } from 'react';
import PropTypes, { nominalTypeHack } from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Create from '@material-ui/icons/Create';
import Undo from '@material-ui/icons/Undo';
import Save from '@material-ui/icons/Save';
import Add from '@material-ui/icons/Add';
import './Row.css';

function autoGrow(event) {
  // https://stackoverflow.com/questions/995168/textarea-to-resize-based-on-content-length
  // Auto-height of textarea: https://stackoverflow.com/questions/17772260/textarea-auto-height
  const element = event.target;
  element.style.height = "5px";
  element.style.height = (element.scrollHeight)+"px";
}

function EditableTableCell(props) {
  const { editable, cellname, children, classes, description, ...opts } = props;
  const value = children;

  const growTextArea = (element) => {
    if (element) {
      element.style.height = (element.scrollHeight) + "px";
    }
  }
  if (editable) {
    return (
      <EditContext.Consumer>
        {({ handleInputChange }) => {
          if (description) {
            return (
              <TableCell className={classes.tablecell} {...opts} >
                <textarea
                  ref={growTextArea} defaultValue={value} name={cellname}
                  wrap="soft" onChange={handleInputChange}
                >
                </textarea>
              </TableCell>
            );
          } else {
            return (
              <TableCell className={classes.tablecell} {...opts} >
                <input type="text" defaultValue={value} name={cellname} onChange={handleInputChange}/>
              </TableCell>
            );
          }
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

// TODO: create css class for EditButton
function EditButton(props) {

  if (props.editable) {
    return (
      <EditContext.Consumer>
        {({ saveEdition, cancelEdition }) => (
          <div className="button-parent-div">
            <button style={{color: 'royalblue'}} onClick={saveEdition}>
              <Save />
            </button>
            <button style={{color: 'indianred'}} onClick={cancelEdition}>
              <Undo />
            </button>
          </div>
        )}
      </EditContext.Consumer>
    );
  } else {
    return (
      <EditContext.Consumer>
        {({ changeEditableState }) => (
          <div className="button-parent-div">
            <button style={{color: 'olivedrab'}} onClick={changeEditableState}><Create /></button>
            <button style={{color: 'indianred'}} ><DeleteForever /></button>
          </div>
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
      <EditableTableCell editable={editable} classes={classes} cellname="description" description>{row["description"]}</EditableTableCell>
      <TableCell>
        <EditButton editable={editable} classes={classes}/>
      </TableCell>
    </TableRow>
  );
}

// Container - handles cells states, which are modified by child elements through the Edit button
class Row extends Component {
  constructor(props) {
    super(props);

    this.saveEdition = this.saveEdition.bind(this);
    this.cancelEdition = this.cancelEdition.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.changeEditableState = this.changeEditableState.bind(this);

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

  saveEdition() {
    this.setState(prevState => {
      const newRow = prevState.data.currentRow;
      const newData = {
        currentRow: newRow,
        originalRow: Object.assign({}, newRow)
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
      const oldRow = prevState.data.originalRow;
      const oldData = {
        currentRow: oldRow,
        originalRow: Object.assign({}, oldRow)
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

    this.setState(prevState => {
      const oldRow = prevState.data.originalRow;
      const newRow = prevState.data.currentRow;
      // I think these values should always be treated like strings,
      // and when they will need to be processed, the function will handle appropriately
      if (["price", "quantity"].includes(name))  {
        newRow[name] = Number(value);
      } else {
        newRow[name] = value;
      }
      console.log(" ++ ", newRow[name], oldRow[name])

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

  render() {
    const data = this.state.data;
    const classes = this.state.classes;
    const editable = this.state.editable;
    return (
      <EditContext.Provider value={this.state}>
        <Content data={data} classes={classes} editable={editable}/>
      </EditContext.Provider>
    );
  }
}

export default Row;
