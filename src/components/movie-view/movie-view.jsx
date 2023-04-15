import './movie-view.scss';
import Button from 'react-bootstrap/Button';

export const MovieView = ({ movie, onBackClick }) => {
   return (
      <div class='movie-info'>
         <div>
            <img src={movie.ImagePath} alt={"Poster for : " + movie.Title} />
         </div>
         <br />   
         <div>
            <span>Title: </span>
            <span>{movie.Title}</span>
         </div>
         <br />   
         <div>
            <span>Genre: </span>
            <span>{movie.Genre.Name}</span>
         </div>
         <br />   
         <div>
            <span>Description: </span>
            <span>{movie.Description}</span>
         </div>
         <br />   
         <div>
            <span>Director: </span>
            <span>{movie.Director.Name}</span>
         </div>
         <br />
         <Button
            onClick={onBackClick}
            className='back-button'
            style={{ cursor: 'pointer' }}
            >Back
         </Button>
      </div>
   );
 };
 