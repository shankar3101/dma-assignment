const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes');

const PORT = 3001;

module.exports = {
    init: (Student) => {
        const app = express();
        app.use(bodyParser.json());
        app.use(cors());

        routes.register(app, Student);

        app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
    }
}
