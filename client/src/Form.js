import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { baseUrl } from './constants';

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    menu: {
        width: 200,
    },
    modal: {
        display: 'flex',
        flexWrap: 'wrap',
    }
}));

function Form({ open, handleClose, data = {}, addStudent, editStudent }) {
    const classes = useStyles();
    const [firstName, setFirstName] = React.useState(data.firstName || '');
    const [lastName, setLastName] = React.useState(data.lastName || '');
    const [studentID, setStudentID] = React.useState(data.studentID || '');
    const [phoneNumber, setPhoneNumber] = React.useState(data.phoneNumber || '');
    const [status, setStatus] = React.useState(data.status || 'active');

    const handleSave = async () => {
        if (!firstName || !lastName || !studentID || !phoneNumber || !status) {
            alert('All fields are mandatory');
            return;
        }
        try {
            const newData = { firstName, lastName, studentID: +studentID, phoneNumber: +phoneNumber, status };
            if (data.isOld) {
                delete newData.studentID;
                const response = await axios.put(`${baseUrl}/students/${studentID}`, newData);
                editStudent(response.data);
            } else {
                const response = await axios.post(`${baseUrl}/students`, newData);
                addStudent(response.data);
            }
            handleClose();
        } catch (e) {
            console.log(e);
            alert('Erro while saving data. Please try again!');
        }
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add New Student</DialogTitle>
            <DialogContent className={classes.modal}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="first-name"
                    label="First Name"
                    className={classes.textField}
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="last-name"
                    label="Last Name"
                    className={classes.textField}
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                />
                <TextField
                    id="student-id"
                    label="Student ID"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="dense"
                    className={classes.textField}
                    value={studentID}
                    onChange={e => setStudentID(e.target.value)}
                    disabled={data.isOld}
                />
                <TextField
                    id="phone-number"
                    label="Phone Number"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="dense"
                    className={classes.textField}
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                />
                <TextField
                    id="select-status"
                    select
                    label="Select Status"
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    className={classes.textField}
                    helperText="Please select a status"
                    margin="dense"
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                >
                    {['active', 'delinquent', 'dropped'].map(option => (
                        <MenuItem key={option} value={option}>
                            {option.substr(0, 1).toUpperCase() + option.substr(1)}
                        </MenuItem>
                    ))}
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default Form;