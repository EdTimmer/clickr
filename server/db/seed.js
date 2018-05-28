const User = require('./User');
const Album = require('./Album');
const Photo = require('./Photo');
const Person = require('./Person');

const people = [
  {
    firstName: 'Moe',
    lastName: 'Flash',
    email: 'moe@gmail.com',
    isAdmin: true,
    theme: 'style-1.css',
    password: 'MOE',
    passwordPrompt: false,
    userId: 1
  },
  {
    firstName: 'Curly',
    lastName: 'Aperture',
    email: 'curly@gmail.com',
    isAdmin: false,
    theme: 'style-1.css',
    password: 'CURLY',
    passwordPrompt: false,
    userId: 2
  },
  {
    firstName: 'Larry',
    lastName: 'Exposure',
    email: 'larry@gmail.com',
    isAdmin: false,
    theme: 'style-1.css',
    password: 'LARRY',
    passwordPrompt: false,
    userId: 3
  }
];

const users = [
  {
    firstName: 'Moe',
    lastName: 'Flash',
    email: 'moe@gmail.com',
    isAdmin: true,
    theme: 'style-1.css',
    password: 'MOE',
    passwordPrompt: false
  },
  {
    firstName: 'Curly',
    lastName: 'Aperture',
    email: 'curly@gmail.com',
    isAdmin: false,
    theme: 'style-1.css',
    password: 'CURLY',
    passwordPrompt: false
  },
  {
    firstName: 'Larry',
    lastName: 'Exposure',
    email: 'larry@gmail.com',
    isAdmin: false,
    theme: 'style-1.css',
    password: 'LARRY',
    passwordPrompt: false
  }
];

const albums = [
  {
    name: 'First Album',
    personId: 1
  },
  {
    name: 'Second Album',
    personId: 2
  },
  {
    name: 'Third Album',
    personId: 3
  }
];

const photos = [
  {
    imageURL: '/images/ed1.jpg',
    title: 'One',
    description: 'Image One',
    albumId: 1,
    personId: 1
  },
  {
    imageURL: '/images/natik_camera.jpg',
    title: 'Two',
    description: 'Image Two',
    albumId: 1,
    personId: 1
  },
  {
    imageURL: '/images/alpacas.jpg',
    title: 'Three',
    description: 'Image Three',
    albumId: 2,
    personId: 2
  },
  {
    imageURL: '/images/Katya2.jpg',
    title: 'Three',
    description: 'Katya',
    albumId: 2,
    personId: 2
  },
  {
    imageURL: '/images/Masha&Shurik.jpg',
    title: 'Three',
    description: 'Masha and Shurik',
    albumId: 2,
    personId: 2
  },
  {
    imageURL: '/images/empire.jpg',
    title: 'Three',
    description: 'Image Three',
    albumId: 3,
    personId: 3
  },
  {
    imageURL: '/images/city.jpg',
    title: 'Three',
    description: 'city',
    albumId: 3,
    personId: 3
  }
];

const seed = () => {
  return Promise.all(people.map( person => Person.create(person)))
    .then(() => {
      return Promise.all(albums.map( album => Album.create(album)));
    })
    .then( () => {
      return Promise.all(photos.map( photo => Photo.create(photo)));
    })
    .then( () => {
      return Promise.all(users.map( user => User.create(user)));
    });
  };

module.exports = seed;
