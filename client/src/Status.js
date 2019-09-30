import React from 'react';
import Button from '@material-ui/core/Button';
import { useDrop } from 'react-dnd';
import axios from 'axios';
import { ItemTypes, baseUrl } from './constants';

function Status({ status, setActiveStatus, activeStatus, editStudent }) {
    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.STUDENT,
        drop: async (item) => {
            const data = { ...item.student, status };
            delete data.studentID;
            try {
                const response = await axios.put(`${baseUrl}/students/${item.student.studentID}`, data);
                editStudent(response.data);
            } catch (e) {
                console.log(e);
                alert('Error while changing the status of the student.');
            }
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    })
    return (
        <Button color={activeStatus === status ? 'primary' : 'secondary'} ref={drop}
            size="large" variant="contained" style={{ marginLeft: 10, marginRight: 10, color: isOver ? '#000' : '#fff' }}
            onClick={() => setActiveStatus(status)}>
            {status.substr(0, 1).toUpperCase() + status.substr(1)}
        </Button>
    );
}

export default Status;