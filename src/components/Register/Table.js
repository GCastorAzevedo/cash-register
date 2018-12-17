import React from 'react';
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

let id = 0;
function createData(name, code, price, quantity, description) {
    id += 1;
    return { id, name, code, price, quantity, description }
}

const rows = [
    createData('Caixa', 123, 350.0, 1, 'Caixa de bateria Adah.'),
    createData('Prato', 124, 300.0, 1, 'Prato Zyldian B20 com rachadura reformada.')
];

function RegisterTable(props) {
    const { classes } = props;

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
                    {rows.map(row => {
                        return (
                            <TableRow key={row.id}>
                                <TableCell className={classes.tablecell} component="th" scope="row">{
                                    row.name
                                }</TableCell>
                                <TableCell className={classes.tablecell} numeric>{row.code}</TableCell>
                                <TableCell className={classes.tablecell} numeric>{row.price}</TableCell>
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

RegisterTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegisterTable);