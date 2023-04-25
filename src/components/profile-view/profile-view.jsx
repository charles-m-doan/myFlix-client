import React, { useState } from 'react';
import { Card, Col, Form, Button } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export const ProfileView = ({ user, token, movies, onLoggedOut, updateUser }) => {

   const [username, setUsername] = useState(' ');
   const [password, setPassword] = useState(' ');
   const [email, setEmail] = useState(' ');
   const [birthdate, setBirthdate] = useState(' ');
   // const [favoriteMovies, setFavoriteMovies] = useState(user.favoriteMovies);
   const [favoriteMovies, setFavoriteMovies] = useState(user.FavoriteMovies || []);

   const addToFavorites = (movie) => { };
   
console.log("user: ", user);
console.log("movies: ", movies);
console.log("user.favoriteMovies: ", user.favoriteMovies);

   // let favoriteMovies = movies.filter(movie => user.favoriteMovies.includes(movie.id));
   
   const handleSubmit = event => {
      event.preventDefault();

      const data = {
         username,
         password,
         email,
         birthdate
       }       
 
      fetch(`https://siders-myflix.herokuapp.com/users/${user.Username}`, {
         method: 'PUT',
         body: JSON.stringify(data),
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
      }
      })
      .then(response => {
         if (response.ok) {
               return response.json();
         } else {
               alert("Changes failed");
               return false;
         }
      })
      .then(user => {
         if (user) {
               alert("Changes successful");
               updateUser(user);
         }
      })
      .catch(e => {
         alert(e);
      });
   }

   const deleteAccount = () => {
      fetch(`https://siders-myflix.herokuapp.com/users/${user.Username}`, {
         method: 'DELETE',
         headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
         if (response.ok) {
               alert("The account has been deleted.");
               onLoggedOut();
         } else {
               alert("Could not delete the account");
         }
      })
      .catch(e => {
         alert(e);
      });
   }

   // const filteredMovies = movies.filter(movie => favoriteMovies.includes(movie._id));
   const filteredMovies = movies.filter(movie => favoriteMovies && favoriteMovies.includes(movie._id));

   return (
      <>
         <Col justify-content-md-center>           
               <Card>
                  <Card.Body>
                     <Card.Title >Your info</Card.Title>
                     <p>Username: {user.Username}</p>
                     <p>Email: {user.Email}</p>
                     <p>Birthdate: {user.Birthday}</p>
                  </Card.Body>
               </Card>
               <Button onClick={() => {
                  if (confirm("Are you sure?")) {
                     deleteAccount();
                  }
               }}>Delete user account</Button>
         </Col>
         <br />
         <Col justify-content-md-center>
               <Card>
                  <Card.Body>
                     <Card.Title>Update your info</Card.Title>
                     <br />
                     <Form onSubmit={handleSubmit}>
                           <Form.Group>
                              <Form.Label>Username:</Form.Label>
                              <Form.Control
                                 type='text'
                                 value={username}
                                 onChange={e => setUsername(e.target.value)}
                                 required
                                 minLength={3}
                              />
                           </Form.Group>
                           <br />
                           <Form.Group>
                              <Form.Label>Password:</Form.Label>
                              <Form.Control
                                 type='password'
                                 value={password}
                                 onChange={e => setPassword(e.target.value)}
                                 required
                              />
                           </Form.Group>
                           <br />
                           <Form.Group>
                              <Form.Label>Email:</Form.Label>
                              <Form.Control
                                 type='email'
                                 value={email}
                                 onChange={e => setEmail(e.target.value)}
                                 required
                              />
                           </Form.Group>
                           <br />
                           <Form.Group>
                              <Form.Label>Birthdate:</Form.Label>
                              <Form.Control
                                 type='date'
                                 value={birthdate}
                                 onChange={e => setBirthdate(e.target.value)}
                                 // required
                              />
                           </Form.Group>
                           <br />
                           <Button type='submit'>Submit</Button>
                     </Form>
                  </Card.Body>
               </Card>
         </Col>
         <Col justify-content-md-center>
               <h3>Your favorites:</h3>
         </Col>
         {filteredMovies.map(movie => (
               <Col justify-content-md-center key={movie.id}>
                  <MovieCard
                     movie={movie}
                     addToFavorites={addToFavorites}
                     setFavoriteMovies={setFavoriteMovies}
                     user={user}
                  />
               </Col>
         ))}
      </>
   );
}