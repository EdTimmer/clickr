const User = require('./User');
const Album = require('./Album');
const Photo = require('./Photo');

const users = [
  {
    firstName: 'Moe',
    lastName: 'Flash',
    email: 'moe@gmail.com',
    isAdmin: true,
    theme: 'style-1.css'
  },
  {
    firstName: 'Curly',
    lastName: 'Aperture',
    email: 'curly@gmail.com',
    isAdmin: false,
    theme: 'style-1.css'
  },
  {
    firstName: 'Larry',
    lastName: 'Exposure',
    email: 'larry@gmail.com',
    isAdmin: false,
    theme: 'style-1.css'
  }
];

const albums = [
  {
    name: 'First Album',
    userId: 1
  },
  {
    name: 'Second Album',
    userId: 2
  },
  {
    name: 'Third Album',
    userId: 3
  }
];

const photos = [
  {
    imageURL: '/images/ed1.jpg',
    title: 'One',
    description: 'Image One',
    albumId: 1,
    userId: 1
  },
  {
    imageURL: '/images/natik_camera.jpg',
    title: 'Two',
    description: 'Image Two',
    albumId: 1,
    userId: 1
  },
  {
    imageURL: '/images/alpacas.jpg',
    title: 'Three',
    description: 'Image Three',
    albumId: 2,
    userId: 2
  },
  {
    imageURL: '/images/bridge.jpg',
    title: 'Three',
    description: 'Bridge',
    albumId: 2,
    userId: 2
  },
  {
    imageURL: '/images/empire.jpg',
    title: 'Three',
    description: 'Image Three',
    albumId: 3,
    userId: 3
  },
  {
    imageURL: '/images/city.jpg',
    title: 'Three',
    description: 'city',
    albumId: 3,
    userId: 3
  }
];

const seed = () => {
  return Promise.all(users.map( user => User.create(user)))
    .then(() => {
      return Promise.all(albums.map( album => Album.create(album)));
    })
    .then( () => {
      return Promise.all(photos.map( photo => Photo.create(photo)));
    });
  };

module.exports = seed;
