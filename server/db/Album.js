const conn = require('./conn');
const { Sequelize } = conn;

const Album = conn.define('album', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Album;
