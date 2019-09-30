module.exports = {
    register: (app, Student) => {
        app.post('/students', createStudent);

        app.put('/students/:studentID', updateStudent);

        app.get('/students', getStudents);

        async function createStudent(req, res) {
            const { firstName, lastName, studentID, phoneNumber, status } = req.body;
            if (!firstName) {
                res.status(400).json({ error: "First Name is mandatory" });
                return;
            }
            if (!lastName) {
                res.status(400).json({ error: "Last Name is mandatory" });
                return;
            }
            if (!studentID) {
                res.status(400).json({ error: "Student ID is mandatory" });
                return;
            }
            if (typeof studentID !== "number") {
                res.status(400).json({ error: "Student ID must be numberic" });
                return;
            }
            if (!phoneNumber) {
                res.status(400).json({ error: "Phone Number is mandatory" });
                return;
            }
            if (typeof phoneNumber !== "number") {
                res.status(400).json({ error: "Phoner Number must be numeric" });
                return;
            }
            if (!status) {
                res.status(400).json({ error: "Status is mandatory" });
                return;
            }
            if (["active", "delinquent", "dropped"].indexOf(status) === -1) {
                res.status(400).json({ error: "Status must be either active, delinquent or dropped only" });
                return;
            }
            try {
                const response = await Student.create(req.body);
                res.status(200).json(response);
            } catch (e) {
                console.log(e);
                res.status(500).json({ error: "Student is not created. Please try again." });
            }
        }

        async function updateStudent(req, res) {
            const { firstName, lastName, phoneNumber, status } = req.body;
            if (!firstName) {
                res.status(400).json({ error: "First Name is mandatory" });
                return;
            }
            if (!lastName) {
                res.status(400).json({ error: "Last Name is mandatory" });
                return;
            }
            if (!phoneNumber) {
                res.status(400).json({ error: "Phone Number is mandatory" });
                return;
            }
            if (typeof phoneNumber !== "number") {
                res.status(400).json({ error: "Phoner Number must be numeric" });
                return;
            }
            if (!status) {
                res.status(400).json({ error: "Status is mandatory" });
                return;
            }
            if (["active", "delinquent", "dropped"].indexOf(status) === -1) {
                res.status(400).json({ error: "Status must be either active, delinquent or dropped only" });
                return;
            }
            try {
                const oldStudent = await Student.findOne({ where: { studentID: req.params.studentID } });
                if (oldStudent) {
                    const response = await oldStudent.update(req.body);
                    res.status(200).json(response);
                } else {
                    res.status(400).json({ error: "Student is not present. You need to create instead of edit" });
                }
            } catch (e) {
                console.log(e);
                res.status(500).json({ error: "Student data is not saved. Please try again." });
            }
        }

        async function getStudents(req, res) {
            try {
                const response = await Student.findAll();
                res.status(200).json(response);
            } catch (e) {
                console.log(e);
                res.status(500).json({ error: "Unable to get the list of students. Please try again." });
            }
        }
    }
}