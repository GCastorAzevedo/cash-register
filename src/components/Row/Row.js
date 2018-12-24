import React, { Component } from 'react';
import PropTypes, { nominalTypeHack } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

// <EditableTableCell className={classes.tablecell} numeric editable={true}>{row.price}</EditableTableCell>
class EditableTableCell_ extends Component {
  constructor(props) {
      super(props);
      let { editable, children, ...opts} = props;
      this.state = {
          editable: editable,
          value: children,
          opts: opts
      }
  }

  componentDidMount() {
    // Checkout for: https://stackoverflow.com/questions/38892672/react-why-child-component-doesnt-update-when-prop-changes
    console.log("editable blabalbla", this.state.editable);
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

function EditableTableCell(props) {
  const { editable, children, ...opts } = props;
  const value = children;

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
        {({saveEdition, cancelEdition}) => (
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
        {({changeEditableState}) => (
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
  // TODO: delete this.
  console.log("heauheuaheuhaue", editable);
  return (
    <TableRow key={row.id}>
      <EditableTableCell className={classes.tablecell} editable={editable} component="th" scope="row">{row.name}</EditableTableCell>
      <EditableTableCell className={classes.tablecell} editable={editable} numeric>{row.code}</EditableTableCell>
      <EditableTableCell className={classes.tablecell} editable={editable} numeric>{row.price}</EditableTableCell>
      <EditableTableCell className={classes.tablecell} editable={editable} numeric>{row.quantity}</EditableTableCell>
      <EditableTableCell className={classes.tablecell} editable={editable}>{row.description}</EditableTableCell>
      <TableCell><EditButton editable={editable}/></TableCell>
    </TableRow>
  );
}

// Container - handles cells states, which are modified by child elements through the Edit button
class Row extends Component {
  constructor(props) {
    super(props);

    this.changeEditableState = () => {
      this.setState(state => ({
        editable: state.editable ? false : true,
      }));
    };
    // TODO: what should edit and cancel do ?
    this.saveEdition = () => {
      this.setState(state => (state));
    };
    this.cancelEdition = () => {
      this.setState(state => (state));
    };
    // TODO: delete this.
    this.change = this.change.bind(this);

    this.state = {
      data: {
        row: props.row
      },
      classes: props.classes,
      editable: false,
      changeEditableState: this.changeEditableState,
      saveEdition: this.saveEdition,
      cancelEdition: this.cancelEdition,
    }

    // TODO: delete this.
    console.log(this.state.editable);
  }

  // TODO: delete this.
  change() {
    this.setState(state => ({
      editable: !state.editable // ? true : false
    }));
  }

  componentDidUpdate() {
    console.log(this.state);
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

/*
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
*/

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