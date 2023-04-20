import React from 'react';
import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(undefined);

   useEffect(() => {
      getMovies(token);
   }, [token]);

   const getMovies = (token) => {
      if (!token) {
         return;
      }

      fetch('https://siders-myflix.herokuapp.com/movies', {
         headers: { Authorization: `Bearer ${token}` }
      }) .then((response) => response.json())
         .then((data) => {
            setMovies(data);
         });
   }
   
   return (
      <BrowserRouter>
         <NavigationBar
            user={user}
            onLoggedOut={() => {
               setUser(undefined);
               setToken(undefined);
               localStorage.clear();
            } }
         />

         <Row className='justify-content-md-center'>
            <Routes>
               <Route
                  path='/login'
                  element={
                     < >
                        {user ? (
                           <Navigate to='/' />
                        ) : (
                           <Col md={3}>
                              <LoginView
                                 onLoggedIn={(user, token) => {
                                    setUser(user);
                                    setToken(token);
                                 } }
                              />
                           </Col>
                           )
                        }
                     </>
                  }
               />  
                              
               {/* <React.Fragment>
                  <br />
                  <br />
                  <br />
                  <h3>Or sign up here:</h3>
                  <br />
                  <br />
               </React.Fragment> */}

               <Route
                  path='/signup'
                  element={
                     < >
                        {user ? (
                           <Navigate to='/' />
                        ) :(
                           <Col md={3}>
                              <SignupView />
                           </Col>
                        )
                        }
                     </>
                  }
               />
               <Route
                  path='/movies/:movieId'
                  element={
                     < >
                        {!user ? (
                           <Navigate to='/login' replace />
                        ) : movies.length === 0 ? (
                           <Col>The list is empty!</Col>
                        ) : (
                           <Col md={4}>
                              <MovieView movie={movies} />
                           </Col>
                           )
                        }
                     </>
                  }
               />
               <Route
                  path="/profile"
                  element={
                     <>
                        {!user ? (
                           <Navigate to="/login" replace />
                        ) : (
                           <Col>
                              <ProfileView user={user} movies={movies}/>
                           </Col>
                        )}
                     </>
                  }
               />
               <Route
                  path="/"
                  element={
                     < >
                        {!user ? (
                           <Navigate to='/login' replace />
                        ) : movies.length === 0 ? (
                           <Col>The list is empty!</Col>
                        ) : (
                           < >
                              {movies.map((movie) => (
                                 <Col 
                                    key={movie.id} 
                                    md={4}
                                    className='mb-5'
                                 >
                                    <MovieCard movie={movie} />
                                 </Col>
                              ) ) }
                           </>
                           )
                        }
                     </>
                  }
               />              
            </Routes>
         </Row>
      </BrowserRouter>
   );
};