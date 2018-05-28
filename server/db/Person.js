const conn = require('./conn');
const { Sequelize } = conn;

const Person = conn.define('person', {
  // id: {
  //   type: Sequielize.UUID,
  //   defaultValue: Sequelize.UUIDV4,
  //   primaryKey: true
  // },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  theme: {
    type: Sequelize.STRING,
    defaultValue: 'style-1.css'
  },
  password: {
    type: Sequelize.STRING
  },
  passwordPrompt: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
}, {
  getterMethods: {
    name() {
      return `${this.firstName} ${this.lastName}`;
    }
  }
});

module.exports = Person;
