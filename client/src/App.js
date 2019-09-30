import React, { useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend';
import Button from '@material-ui/core/Button';
import Student from './Student';
import Status from './Status';
import Form from './Form';
import { columns, baseUrl } from './constants';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        textAlign: 'center'
    },
    tableWrapper: {
        maxHeight: 407,
        overflow: 'auto',
    },
    btnGroup: {
        maxWidth: 400,
        margin: 20,
        boxShadow: 'none'
    },
}));

function App() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [activeStatus, setActiveStatus] = React.useState('active');
    const [students, setStudents] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({});

    useEffect(() => {
        const fetchData = async function () {
            try {
                const response = await axios.get(`${baseUrl}/students`);
                if (response && response.data) {
                    setStudents(response.data);
                }
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addStudent = (student) => {
        setStudents([...students, { ...student }]);
    }

    const editStudent = (student) => {
        setStudents(students.map(stu => stu.id === student.id ? { ...student } : { ...stu }));
    }

    const studentsToShow = students.filter(student => student.status === activeStatus);

    return (
        <DndProvider backend={HTML5Backend}>
            <Paper className={classes.root}>
                <Button variant="contained" onClick={() => {
                    setFormData({});
                    handleClickOpen();
                }}>
                    Add New Student
                </Button>
                <ButtonGroup
                    variant="contained"
                    color="secondary"
                    size="large"
                    aria-label="large contained secondary button group"
                    className={classes.btnGroup}
                >
                    {
                        ['active', 'delinquent', 'dropped'].map(status => (
                            <Status status={status} activeStatus={activeStatus} key={status}
                                editStudent={editStudent}
                                setActiveStatus={(status) => {
                                    setActiveStatus(status);
                                    setPage(0);
                                }} />
                        ))
                    }
                </ButtonGroup>
                <div className={classes.tableWrapper}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {columns.map(column => (
                                    <TableCell
                                        key={column.id}
                                        align="center"
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {studentsToShow.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(student =>
                                <Student student={student} key={student.id} setFormData={setFormData} setOpen={handleClickOpen} />
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[10, 20]}
                    component="div"
                    count={studentsToShow.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'previous page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'next page',
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            {open && <Form open={open} handleClose={handleClose} data={formData} addStudent={addStudent} editStudent={editStudent} />}
        </DndProvider>
    );
}

export default App;
