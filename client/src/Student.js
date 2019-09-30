import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import { useDrag } from 'react-dnd'
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';
import { ItemTypes, columns } from './constants';

const useStyles = makeStyles({
    row: {
        cursor: 'pointer'
    },
});

function Student({ student, setFormData, setOpen }) {
    const classes = useStyles();
    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.STUDENT, student },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })

    const getCellData = (data, id) => {
        switch (id) {
            case 'name':
                return `${data.firstName} ${data.lastName}`;
            case 'edit':
                return (
                    <Fab color="primary" aria-label="edit" size="small"
                        onClick={() => {
                            setFormData({ ...data, isOld: true });
                            setOpen();
                        }}>
                        <EditIcon />
                    </Fab>
                );
            default:
                return data[id];
        }
    }

    return (
        <TableRow hover role="checkbox" tabIndex={-1} ref={drag} className={classes.row} style={{
            opacity: isDragging ? 0.5 : 1,
            fontWeight: 'bold',
            cursor: 'move',
        }}>
            {columns.map(column => {
                return (
                    <TableCell key={column.id} align="center">
                        {getCellData(student, column.id)}
                    </TableCell>
                );
            })}
        </TableRow>
    );
}

export default Student;