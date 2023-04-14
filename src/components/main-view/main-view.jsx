import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(undefined);

   useEffect(() => {
      if (!token) {
         return;
      }

      fetch('https://siders-myflix.herokuapp.com/movies', {
         headers: { Authorization: `Bearer ${token}` }
      })
         .then((response) => response.json())
         .then((data) => {
         console.log(data);
         setMovies(data);
         });
   }, [token]);
   
   return (
      <Row className='justify-content-md-center'>
         {
         !user ? (
            < >
               <Col md={3}>
                  <LoginView
                     onLoggedIn={(user, token) => {
                     setUser(user);
                     setToken(token);
                     } }
                  />
                  <br /><br /><br />
                  Or Sign Up here:
                  <br /><br />
                  <SignupView />
               </Col>
            </>
         ) : 
         selectedMovie ? (
            <Col md={4}>
               <MovieView
                  movie={selectedMovie}
                  onBackClick={() => setSelectedMovie(null)}
               />
            </Col>
         ) : 
         movies.length === 0 ? (
            <div>The list is empty!</div>
         ) : 
         (
            < >
               {movies.map((movie) => (
                  <Col 
                     key={movie.id} 
                     md={4}
                     className='mb-5'
                  >
                     <MovieCard
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                           setSelectedMovie(newSelectedMovie);
                        }}
                     />
                  </Col>
               ))}
            </>

         )}

      </Row>
    );
  }

//   if (selectedMovie) {
//     return (
//       <MovieView
//         movie={selectedMovie}
//         onBackClick={() => setSelectedMovie(null)}
//       />
//     );
//   }

//   if (!movies || movies.length === 0) {
//     return <div>The list is empty!</div>;
//   }

//   return (
//     <div>
//       {movies.map((movie) => (
//         <MovieCard
//           key={movie.id}
//           movie={movie}
//           onMovieClick={(newSelectedMovie) => {
//             setSelectedMovie(newSelectedMovie);
//           }}
//         />
//       ))}
//       <button
//         onClick={() => {
//           setUser(null);
//           setToken(null);
//           localStorage.clear();
//         }}
//       >
//         Logout
//       </button>
//     </div>
//   );
// };