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
import { fetchMovies, addToFavorites } from "../../util/api";

export const MainView = () => {
   const storedUser = JSON.parse(localStorage.getItem('user'));
   const storedToken = localStorage.getItem('token');
   const [token, setToken] = useState(storedToken ? storedToken : null);
   const [movies, setMovies] = useState([]);
   const [user, setUser] = useState(storedUser? storedUser : null);

   const updateUser = (newUser) => {
      setUser(newUser);
   };
 
   const onLoggedOut = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      updateUser(null);
   };

   useEffect(() => {
      fetchMovies(token)
        .then((data) => {
          setMovies(data);
        })
        .catch((error) => {
          alert(error.message);
        });
    }, [token]);
      
    const handleAddToFavorite = (movieId) => {
      const accessToken = localStorage.getItem('token');
      const userName = JSON.parse(localStorage.getItem('user')).Username;
    
      addToFavorites(userName, movieId, accessToken)
        .then((data) => {
          alert('Movie added to favorites');
          const updatedFavorites = [...user.FavoriteMovies, data._id];
          setUser({ ...user, FavoriteMovies: updatedFavorites });
    
          setMovies((prevMovies) =>
            prevMovies.map((movie) => {
              if (movie._id === data._id) {
                return {
                  ...movie,
                  Favorite: true,
                };
              } else {
                return movie;
              }
            })
          );
        })
        .catch((error) => {
          console.error(`Error adding movie to favorites: ${error}`);
        });
    };

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
                              <MovieView movieList={movies} />
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
                              <ProfileView user={user} token={token} movies={movies} onLoggedOut={onLoggedOut} updateUser={updateUser} />
                           </Col>
                        )}
                     </>
                  }
               />
               <Route path="/users/:Username" render={({ match }) => {
                  return (
                     <ProfileView
                        user={user}
                        token={token}
                        movies={movies}
                        favoriteMovies={user.favoriteMovies}
                        onLoggedOut={() => { onLoggedOut() }}
                        updateUser={(user) => { updateUser(user) }}
                        match={match}
                     />
                  );
               } } />

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
                                    <MovieCard movie={movie} addToFavorites={handleAddToFavorite} buttonTitle="Add to Favorites" />

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