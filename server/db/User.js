const conn = require('./conn');
const { Sequelize } = conn;
const KEY = process.env.JWT_KEY;
const jwt = require('jwt-simple');

const User = conn.define('user', {
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

User.authenticate = function(credentials){
  const { email, password } = credentials;
  return this.findOne({
    where: {
      email,
      password
    }
  })
    .then( user => {
      if (user) {
        return jwt.encode({ id: user.id }, KEY);
      }
      throw { status: 401 };
    })
    .catch(err => {
      throw err;
    });
};

User.exchangeTokenForUser = function(token){
  try {
    const id = jwt.decode(token, KEY).id;
    return User.find({
      where: { id }
    })
      .then( user => {
        if (user) {
          return user;
        }
        throw { status: 401 };
      });
  }
  catch (ex){
    return Promise.reject({ status: 401 });
  }
};

module.exports = User;
