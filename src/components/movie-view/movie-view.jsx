import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './movie-view.scss';
import Button from 'react-bootstrap/Button';

export const MovieView = ({movie}) => {
   const {movieID} = useParams();
   const movie = movie.find((b) => b.id === movieId);

   return (
      <div class='movie-info'>
         <div>
            <img src={movie.ImagePath} alt={"Poster for : " + movie.Title} />
         </div>
         <br />   
         <div>
            <span className='heading'>Title:   </span>
            <span>{movie.Title}</span>
         </div>
         <br />   
         <div>
            <span className='heading'>Genre:   </span>
            <span>{movie.Genre.Name}</span>
         </div>
         <br />   
         <div>
            <span className='heading'>Description: </span>
            <span>{movie.Description}</span>
         </div>
         <br />   
         <div>
            <span className='heading'>Director: </span>
            <span>{movie.Director.Name}</span>
         </div>

         <br />
         
         <Button
            className='back-button'
            style={{ cursor: 'pointer' }}
            >Back
         </Button>
      </div>
   );
 };
 