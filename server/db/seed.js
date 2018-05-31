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
    title: 'Selfie',
    description: 'Using Lubitel 2',
    albumId: 1,
    personId: 1
  },
  {
    imageURL: '/images/natik_camera.jpg',
    title: 'Natasha',
    description: 'On Brighton Beach',
    albumId: 1,
    personId: 1
  },
  {
    imageURL: '/images/alpacas.jpg',
    title: 'The Gang',
    description: 'Long Island Yarn & Farm',
    albumId: 2,
    personId: 2
  },
  {
    imageURL: '/images/Katya2.jpg',
    title: 'Katya',
    description: 'Abide',
    albumId: 2,
    personId: 2
  },
  {
    imageURL: '/images/Masha&Shurik.jpg',
    title: 'Masha and Shurik',
    description: 'Masha found Shurik in a park',
    albumId: 2,
    personId: 2
  },
  {
    imageURL: '/images/bridge.jpg',
    title: 'Verrazano',
    description: 'View from Brooklyn',
    albumId: 3,
    personId: 3
  },
  {
    imageURL: '/images/city.jpg',
    title: 'NYC',
    description: 'View from the Freedom Tower',
    albumId: 3,
    personId: 3
  },
  {
    imageURL: '/images/natik_zoey.jpg',
    title: 'Natasha with Zoey',
    description: 'Polaroid!',
    albumId: 1,
    personId: 1
  },
  {
    imageURL: '/images/maine.jpg',
    title: 'Lighthouse in Maine',
    description: 'Visiting Maine',
    albumId: 3,
    personId: 3
  },
  {
    imageURL: '/images/brooklyn.jpg',
    title: 'Brooklyn Bridge',
    description: 'View from a taxi',
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
