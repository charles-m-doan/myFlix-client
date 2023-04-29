import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Button, Row } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import { getUserFavorites, updateUser, deleteAccount } from '../../util/api';

export const ProfileView = ({ user, token, movies, onLoggedOut, updateUser }) => {

   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [email, setEmail] = useState('');
   const [birthdate, setBirthdate] = useState('');
   const [favoriteMovies, setFavoriteMovies] = useState(user.FavoriteMovies || []);
   const [filteredMovies, setFilteredMovies] = useState([]);


   // FUNCTION DECLARATIONS ---------------------

   const handleGetUserFavorites = () => {
      const accessToken = localStorage.getItem('token');
      const userName = JSON.parse(localStorage.getItem('user')).Username;
    
      getUserFavorites(userName, accessToken)
        .then((data) => {
          var filtered = movies.filter((movie) =>
            data.FavoriteMovies.includes(movie._id)
          );
          setFilteredMovies(filtered);
        })
        .catch((error) => {
          console.error(`Error: ${error}`);
        });
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
    
      const data = {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthdate,
      };
    
      const updateUserResponse = await updateUser(
        user.Username,
        data,
        token
      );
    
      if (updateUserResponse) {
        alert('Changes successful');
        localStorage.clear();
        window.location.reload();
      } else {
        alert('Could not update user');
      }
    };
    
    const deleteAccount = () => {
      deleteAccount(user.Username, token)
        .then((success) => {
          if (success) {
            alert('The account has been deleted.');
            onLoggedOut();
          } else {
            alert('Could not delete the account');
          }
        })
        .catch((e) => {
          alert(e);
        });
    };

    // EXECUTE REACT CODE ---------------------
    
    useEffect(() => {
      handleGetUserFavorites();
    }, []);

   return (
      <>
         <Col justify-content-md-center>           
               <Card>
                  <Card.Body>
                     <Card.Title >Your info :</Card.Title>
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
                     <Card.Title>Update your info :</Card.Title>
                     <br />
                     <Form onSubmit={(e) => handleSubmit(e)}>
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
               <h3>Your Favorites:</h3>
         </Col>

         {filteredMovies.map(movie => (
            
            <Col
               justify-content-md-center
               key={movie.id}
               md={3}
               className='mb-3'
            >
               
               <MovieCard
                  movie={movie}
                  addToFavorites={ () => alert("Clicked in ProfileView") }
                  setFavoriteMovies={setFavoriteMovies}
                  user={user}
                  buttonTitle="Remove from Favorites"
                  // onClick={handleClick}
               />
            </Col>
         ))}
      </>
   );
}