const conn = require('./conn');
const User = require('./User');
const Album = require('./Album');
const Photo = require('./Photo');
const seed = require('./seed');

Photo.belongsTo(Album);
Album.hasMany(Photo);
Photo.belongsTo(User);
User.hasMany(Photo);

const syncAndSeed = () => {
  return conn.sync({ force: true })
    .then(() => seed())
    .catch(err => {
      throw err;
    });
};

module.exports = {
  syncAndSeed,
  models: {
    Photo,
    Album,
    User
  }
};
