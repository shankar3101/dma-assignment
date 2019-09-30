const Sequelize = require('sequelize');
const app = require('./app');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

const Student = sequelize.define('Student', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    studentID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    },
    phoneNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

sequelize.sync({ force: true }).then(() => {
    app.init(Student);
}).catch(e => {
    console.log('Error while syncing database' + e);
    process.exit(1);
});