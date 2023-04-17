import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(undefined);

   useEffect(() => {
      if (!token) {
         return;
      }

      fetch('https://siders-myflix.herokuapp.com/movies', {
         headers: { Authorization: `Bearer ${token}` }
      } )
         .then((response) => response.json())
         .then((data) => {
         console.log(data);
         setMovies(data);
         });
   }, [token]);
   
   return (
      <BrowserRouter>
         <Row className='justify-content-md-center'>
            <Routes>
               <Route
                  path="/login"
                  element={
                     < >
                        {!user ? (
                           <Navigate to="/" />
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
                  
               <br /><br /><br />
               Or Sign Up here:
               <br /><br />

               <Route
                  path="/signup"
                  element={
                     < >
                        {user ? (
                           <Navigate to="/" />
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
                  path="/books/:bookId"
                  element={
                     < >
                        {!user ? (
                           <Navigate to="/login" replace />
                        ) : movies.length === 0 ? (
                           <Col>The list is empty!</Col>
                        ) : (
                           <Col md={4}>
                              <MovieView movies={movies} />
                           </Col>
                           )
                        }
                     </>
                  }
               />

               <Route
                  path="/"
                  element={
                     < >
                        {!user ? (
                           <Navigate to="/login" replace />
                        ) : books.length === 0 ? (
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