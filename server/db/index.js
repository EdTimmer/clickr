const conn = require('./conn');
const User = require('./User');
const Album = require('./Album');
const Photo = require('./Photo');
const Person = require('./Person');
const seed = require('./seed');

Photo.belongsTo(Album);
Album.hasMany(Photo);
Album.belongsTo(Person, { onDelete: 'CASCADE'});
Person.hasMany(Album);
Photo.belongsTo(Person, { onDelete: 'CASCADE'});
// User.hasMany(Photo);
Person.hasOne(User);
// Person.hasOne(User);


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
    User,
    Person
  }
};
