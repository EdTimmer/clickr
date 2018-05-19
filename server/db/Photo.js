const conn = require('./conn');
const { Sequelize } = conn;

const Photo = conn.define('photo', {
  imageURL: {
    type: Sequelize.TEXT
  },
  title: {
    type: Sequelize.STRING,
    allowNull: true
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  }
});

module.exports = Photo;
