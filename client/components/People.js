import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const People = ({people, albums, photos}) => {
  if (people.length > 0) {
    console.log('people are:', people);
    return (
      <div className="conatiner">
      <div className="row">   
        <div className="col" />           
        <div className="col">
          <h1>All people</h1><br />
          {
            people.map(person => {
              return (
                <div key={person.id}>
                  <div>
                    <p><Link to={`/people/${person.id}`}>{person.name}</Link></p>
                    <p><i>Number of albums:</i> {albums.filter( album => album.personId === person.id).length}</p> 
                    <p><i>Number of photos:</i> {photos.filter( photo => photo.personId === person.id).length}</p>                    
                  </div>
                </div>
              );
            })
          }
        </div>
        <div className="col">
          <p><i>Number of people:</i> <strong>{people.length}</strong></p>
          {/*<Link to="/personcreate"><button>Add new person</button></Link>*/}
        </div>
        <div className="col" />
      </div>
      </div>
    );
  }
  else {
    return (
      <div>
        <h4><i>There are no people at present.  Add a person.</i></h4>
        {/*<Link to="/personcreate">Add person</Link>*/}
      </div>
    );
  }
};

const mapStateToProps = ({ people, albums, photos }) => {
  return {
    people,
    albums,
    photos
  };
};

export default connect(mapStateToProps)(People);